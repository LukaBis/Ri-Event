import Cookies from 'js-cookie';
import axios from 'axios';

const userAttendsEvent = async (eventId) => {

    try {
        const response = await axios.post(
            '/api/attending-event',
            {
                event_id: eventId
            },
            {
                headers: {
                    'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                    'Accept': "application/json",
                },
            }
        );
        
        if(response.status == 201) {
            return "OK";
        }
    } catch (error) {
        console.log(error.response.data.message)
        throw new Error(error.response.data.message);
    }

    return null;
}

export default userAttendsEvent;