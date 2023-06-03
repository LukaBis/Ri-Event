import Cookies from 'js-cookie';
import axios from 'axios';

const createNewEvent = async (
    id,
    title,
    description,
    date,
    time,
    image
) => {

    const latitude = 0;
    const longitude = 0;

    try {
        const response = await axios.post(
            '/api/events/'+id,
            {
                
                title,
                description,
                latitude,
                longitude,
                date,
                start_time: time,
                image,
                _method:"PUT"
            },
            {
                headers: {
                    'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                    'Accept': "application/json",
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        console.log(response)
        if(response.status == 200) {
            return "OK";
        }
    } catch (error) {
        console.log(error.response.data.message)
        throw new Error(error.response.data.message);
    }

    return null;
}

export default createNewEvent;