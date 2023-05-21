import Cookies from 'js-cookie';
import axios from 'axios';

const getSingleEvent = async (id) => {

    let event = null;

    try {
        const response = await axios.get(`/api/events/${id}`, {
            headers: {
                'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                'Accept': "application/json"
            },
        });
        
        event = response.data.data;
    } catch (error) {
        console.error(error);
    }

    return event;
}

export default getSingleEvent;