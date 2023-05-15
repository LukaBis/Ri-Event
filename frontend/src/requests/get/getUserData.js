import Cookies from 'js-cookie';
import axios from 'axios';

const getUserData = async () => {

    let userData = null;

    try {
        const response = await axios.get('/api/user', {
            headers: {
                'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                'Accept': "application/json"
            },
        });
        
        userData = response.data;
    } catch (error) {
        console.error(error);
    }

    return userData;
}

export default getUserData;