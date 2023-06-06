import Cookies from 'js-cookie';
import axios from 'axios';

const createNewEvent = async (
    title,
    description,
    date,
    time,
    image = null,
    address,
    latitude,
    longitude
) => {

    try {
        const response = await axios.post(
            '/api/events',
            {
                title,
                description,
                latitude,
                longitude,
                address,
                date,
                start_time: time,
                image
            },
            {
                headers: {
                    'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                    'Accept': "application/json",
                    'Content-Type': 'multipart/form-data',
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