import Cookies from 'js-cookie';
import axios from 'axios';

const deleteProfileImage = async () => {

    try {
        const response = await axios.post(
            '/api/profile-picture',
            {
                _method: 'DELETE',
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
            return response.data;
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }

    return null;
}

export default deleteProfileImage;