import Cookies from 'js-cookie';
import axios from 'axios';
import dayjs from 'dayjs';

const updateEvent = async (
  id,
  title,
  description,
  date,
  time,
  image,
  address,
  latitude,
  longitude
) => {
  try {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    console.log(formattedDate);

    const response = await axios.post(
      '/api/events/' + id,
      {
        title,
        description,
        latitude,
        longitude,
        date: formattedDate,
        start_time: time,
        image,
        address,
        latitude,
        longitude,
        _method: "PUT"
      },
      {
        headers: {
          'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
          'Accept': "application/json",
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log(response);

    if (response.status === 200) {
      return "OK";
    }
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }

  return null;
};

export default updateEvent;
