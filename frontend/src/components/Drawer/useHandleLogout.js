import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// this hook return the function that handles logout logic
const useHandleLogout = () => {

    const navigate = useNavigate('');

    return async () => {

        try {
            const response = await fetch('/logout', {
                method: 'POST',
                headers: {
                    'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
                    'Accept': "application/json",
                    'Referer':'localhost:3000'
                },
            });

            if (!response.ok) {
                throw new Error('Logout request failed');
            }

            Cookies.remove('laravel_session');
            Cookies.remove('XSRF-TOKEN');

            navigate('/login');
        
        } catch (error) {
            console.error(error);
        }
    };
};

export default useHandleLogout;