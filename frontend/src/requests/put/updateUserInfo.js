import Cookies from 'js-cookie';
import axios from 'axios';

const updateUserInfo = async (name, email) => {

    try {
        const response = await axios.post(
            '/api/user/profile-information',
            {
                name,
                email,
                _method: 'PUT'
            },
            {
                headers: {
                    'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                    'Accept': "application/json"
                },
            }
        );
        
        if(response.status == 200) {
            return {
                name,
                email
            };
        }
    } catch (error) {
        const errors = error.response.data.errors

        // get first error message and return it
        const firstKey = Object.keys(errors)[0];
        const firstMessage = errors[firstKey];

        throw new Error(firstMessage);
    }

    return null;
}

export default updateUserInfo;