import React from 'react';
import ProfileDetails from './ProfileDetails';
import PasswordUpdate from './PasswordUpdate';
import ProfileImage from './ProfileImage';

function Profile() {

    return (
        <>
            <ProfileDetails />
            <PasswordUpdate />
            <ProfileImage />
        </>
    )
}

export default Profile