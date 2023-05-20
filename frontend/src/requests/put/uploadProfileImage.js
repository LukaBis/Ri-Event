import Cookies from 'js-cookie';
import axios from 'axios';

const uploadProfileImage = async (image) => {

    try {
        const response = await axios.post(
            '/api/profile-picture',
            {
                image,
                _method: 'PUT',
            },
            {
                headers: {
                    'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                    'Accept': "application/json",
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        
        if(response.status == 200) {
            return response?.message;
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }

    return null;
}

export default uploadProfileImage;