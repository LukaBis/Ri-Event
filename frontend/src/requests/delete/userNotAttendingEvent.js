import Cookies from 'js-cookie';
import axios from 'axios';

const userNotAttendingEvent = async (eventId) => {

    try {
        const response = await axios.post(
            '/api/not-attending-event',
            {
                event_id: eventId,
                _method: 'DELETE'
            },
            {
                headers: {
                    'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                    'Accept': "application/json",
                },
            }
        );
        
        if(response.status == 200) {
            return "OK";
        }
    } catch (error) {
        console.log(error.response.data.message)
        throw new Error(error.response.data.message);
    }

    return null;
}

export default userNotAttendingEvent;