import { useState, useEffect } from 'react';
import getUserProfileImage from '../../requests/get/getuserProfileImage';

const useProfileImage = () => {

    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        getUserProfileImage().then(file => {
            setProfileImage(file);
        })
    }, [])

    return profileImage;
}

export default useProfileImage;