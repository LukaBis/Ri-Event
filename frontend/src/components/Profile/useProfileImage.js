import { useState, useEffect } from 'react';
import getUserProfileImage from '../../requests/get/getuserProfileImage';

// when success alert variable changes that means that
// eiter new image is uploaded or old image is deleted
// in both cases we need to update the profile image 
const useProfileImage = (successAlert) => {

    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        getUserProfileImage().then(file => {
            setProfileImage(file);
        })
    }, [successAlert])

    return profileImage;
}

export default useProfileImage;