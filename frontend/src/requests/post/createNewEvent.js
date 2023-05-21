import Cookies from 'js-cookie';
import axios from 'axios';

const createNewEvent = async (
    title,
    description,
    date,
    time,
    image = null
) => {

    const latitude = 0;
    const longitude = 0;

    try {
        const response = await axios.post(
            '/api/events',
            {
                title,
                description,
                latitude,
                longitude,
                date,
                start_time: time,
                image
            },
            {
                headers: {
                    'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                    'Accept': "application/json"
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

export default createNewEvent;