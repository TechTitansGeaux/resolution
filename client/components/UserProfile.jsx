import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser } from './store/appSlice';

const UserProfile = ({trophy, points}) => {
  const authUser = useSelector((state) => state.app.authUser);
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  useEffect(() => {
    if (authUser) {
      setUsername(authUser.username);
    }
  }, [authUser]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = { ...authUser, username: updatedUsername };
      const response = await axios.patch(`/users/${authUser.id}`, updatedUser);
      if (response && response.data) {
        dispatch(setAuthUser(response.data));
        setUpdatedUsername(''); // clear the input field after successful update
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(`/users/${authUser.id}`);
      if (response && response.data) {
        // logout the user by clearing the authUser state
        dispatch(setAuthUser(null));
        // redirect the user to the homepage
        window.location.href = 'http://127.0.0.1:4000';
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    // logout the user by clearing the authUser state
    dispatch(setAuthUser(null));
    // redirect the user to the homepage
    window.location.href = 'http://127.0.0.1:4000';
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setIsImageSelected(true);
  };

  const uploadImageToServer = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await axios.post(`/users/uploadImage/${authUser.id}`, formData);

      if (response && response.data) {
        dispatch(setAuthUser(response.data));
        setSelectedImage(null); // clear the selected image after successful upload
        setIsImageSelected(false); // reset the image selection state
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!authUser) {
    return <div>Loading...</div>;
  }

  const isSaveProfileDisabled = !isImageSelected;
  const isSaveUsernameDisabled = !updatedUsername;

  return (
    <div className='container section'>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <div className='card'>
            <div className='card-body text-center'>
              <img
                src={authUser.picture}
                alt='User Picture'
                className='rounded-circle mb-3'
                style={{ width: '150px', height: '150px', objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => document.getElementById('imageInput').click()}
              />
              <input
                type='file'
                id='imageInput'
                style={{ display: 'none' }}
                accept='image/*'
                onChange={handleImageChange}
              />
              <h2 className='card-title'>{authUser.username}</h2>
              <div className='mb-3'>
                <label htmlFor='usernameInput' className='form-label'>
                  Edit Username:
                </label>
                <input
                  type='text'
                  id='usernameInput'
                  value={updatedUsername}
                  onChange={(event) => setUpdatedUsername(event.target.value)}
                  className='form-control'
                />
                <button
                  onClick={uploadImageToServer}
                  className='btn btn-primary mt-3'
                  disabled={isSaveProfileDisabled}
                >
                  Save Profile Picture
                </button>
                <button
                  onClick={handleUpdateUser}
                  className='btn btn-primary mt-3'
                  disabled={isSaveUsernameDisabled}
                >
                  Save Username
                </button>
              </div>
              <p className='card-text'>Points: {points}</p>
              <p className='card-text'>Trophy: {trophy}</p>
              <div className='d-flex justify-content-between'>
                <button
                  onClick={handleLogout}
                  className='btn btn-outline-secondary'
                >
                  Logout
                </button>
                <div>
                  <button
                    onClick={handleDeleteUser}
                    className='btn btn-danger ml-2'
                  >
                    Delete Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
