import Cookies from 'js-cookie';
import axios from 'axios';

const getProfilePicture = async () => {

    let picture = null;

    try {
        const response = await axios.get('/api/profile-picture', {
            headers: {
                'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                'Accept': "application/json",
                'Access-Control-Allow-Origin' : '*'  
            }        
        });

        picture = response.data

    } catch (error) {
        console.error(error);
    }

    return picture;
}

export default getProfilePicture;
