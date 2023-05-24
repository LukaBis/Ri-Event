import Cookies from 'js-cookie';
import axios from 'axios';

const getUserProfileImage = async () => {

    let image = null;

    try {
        const response = await axios.get('/api/profile-picture', {
            headers: {
                'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                'Accept': "application/json"
            },
        });
        
        image = response.data;
    } catch (error) {
        console.error(error);
    }

    return image;
}

export default getUserProfileImage;