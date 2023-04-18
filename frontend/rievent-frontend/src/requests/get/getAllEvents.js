import Cookies from 'js-cookie';
import axios from 'axios';

const getAllEvents = async () => {

    let events = null;

    try {
        const response = await axios.get('/api/events', {
            headers: {
                'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                'Accept': "application/json"
            },
        });
        
        console.log(response.data.data);
        events = response.data.data;
    } catch (error) {
        console.error(error);
    }

    return events;
}

export default getAllEvents;