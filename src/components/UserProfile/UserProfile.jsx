import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { CircularProgress } from '@material-ui/core';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { MdModeEdit } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { getUser } from '../../graphql/queries';
import { updateUser } from '../../graphql/mutations';
import './UserProfile.scss';

const UserProfile = ({ currentUser }) => {
  const [editName, setEditName] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [name, setName] = useState(null);
  const [status, setStatus] = useState(null);
  const [imageUrl, setImageUrl] = useState('https://scontent-hbe1-1.xx.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=12b3be&_nc_ohc=ShshImdEV0cAX9oxBnD&_nc_ht=scontent-hbe1-1.xx&tp=27&oh=2f020e7365f33da4f2078c61a05c7e65&oe=60A1F0B8');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const fetchData = async () => {
    await API.graphql(
      graphqlOperation(
        getUser, {
          id: currentUser.attributes.sub,
        },
      ),
    )
      .then((currentUserData) => {
        setName(currentUserData.data.getUser.fullName);
        setStatus(currentUserData.data.getUser.status);
        setImageUrl(currentUserData.data.getUser.imageUrl);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onNameSave = async () => {
    setEditName(false);
    try {
      await API.graphql(
        graphqlOperation(
          updateUser, {
            input: {
              id: currentUser.attributes.sub,
              fullName: name,
            },
          },
        ),
      );

      Auth.updateUserAttributes(currentUser, {
        name,
      });
    } catch (err) {
      console.log('Name update error: ', err);
    }
  };

  const onStatusSave = async () => {
    setEditStatus(false);

    await API.graphql(
      graphqlOperation(
        updateUser, {
          input: {
            id: currentUser.attributes.sub,
            status,
          },
        },
      ),
    )
      .catch((err) => console.log('Status update error: ', err));
  };

  const onPhotoUpload = async (e) => {
    e.preventDefault();
    if (!e.target.files[0]) {
      return;
    }
    const reader = new FileReader();
    const file = e.target.files[0];
    try {
      reader.readAsDataURL(file);
    } catch (err) {
      console.log(err);
    }
    reader.onloadend = async () => {
      setImageUrl(reader.result);

      await API.graphql(
        graphqlOperation(
          updateUser, {
            input: {
              id: currentUser.attributes.sub,
              imageUrl: reader.result,
            },
          },
        ),
      )
        .catch((err) => console.log('Image update error: ', err));
    };
  };

  return (
    <div className="user-profile-container">
      <div className="profile-image">
        <label className="file-upload fas">
          <div className="img-wrap img-upload">
            <img alt="user avatar " src={imageUrl} />
          </div>
          <input id="photo-upload" type="file" accept="image/*" multiple="false" onChange={onPhotoUpload} />
        </label>
      </div>
      <div className="profile-name">
        <h2>Name</h2>
        {editName ? (
          <div className="profile-form-group">
            <input
              className="profile-form-control"
              id="name"
              type="text"
              onChange={handleNameChange}
              value={name}
              placeholder="Enter Your Name"
              autoComplete="off"
              required
            />
            <FaCheck onClick={onNameSave} />
          </div>
        )
          : (
            <div className="editable-filed">
              <div className="user-info">
                <h3>{name}</h3>
              </div>
              <MdModeEdit onClick={() => setEditName(true)} />
            </div>
          )}
      </div>
      <div className="profile-status">
        <h2>Status</h2>
        {editStatus ? (
          <div className="profile-form-group">
            <input
              className="profile-form-control"
              id="status"
              type="text"
              onChange={handleStatusChange}
              value={status}
              placeholder="Enter Your Status"
              autoComplete="off"
              required
            />
            <FaCheck onClick={onStatusSave} />
          </div>
        )
          : (
            <div className="editable-filed">
              <div className="user-info">
                <h3>{status}</h3>
              </div>
              <MdModeEdit onClick={() => setEditStatus(true)} />
            </div>
          )}
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  currentUser: PropTypes.shape({
    attributes: PropTypes.shape({
      sub: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UserProfile;
