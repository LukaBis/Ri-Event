import Cookies from 'js-cookie';
import axios from 'axios';

const getAllEventsUserAttends = async () => {

    let events = null;

    try {
        const response = await axios.get(`/api/attending/`, {
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

export default getAllEventsUserAttends;