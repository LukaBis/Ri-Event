import Cookies from 'js-cookie';
import axios from 'axios';

const getProfilePicture = async () => {

    let picture = null;

    try {
        const response = await axios.get('/api/picture', {
            headers: {
                'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                'Accept': "image/jpeg",
                'Access-Control-Allow-Origin' : '*'  
            },
            responseType: 'arraybuffer' 
        });

        const base64 = btoa(
            new Uint8Array(response.data)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        picture = 'data:image/jpeg;base64,' + base64;
    } catch (error) {
        console.error(error);
    }

    return picture;
}

export default getProfilePicture;
