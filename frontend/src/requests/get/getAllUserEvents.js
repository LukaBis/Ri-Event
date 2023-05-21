import Cookies from 'js-cookie';
import axios from 'axios';

// get all events whose host is currently authenticated user
const getAllUserEvents = async () => {

    let events = null;

    try {
        const response = await axios.get(`/api/myevents/`, {
            headers: {
                'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                'Accept': "application/json"
            },
        });
        
        events = response.data.data;
    } catch (error) {
        console.error(error);
    }

    return events;
}

export default getAllUserEvents;