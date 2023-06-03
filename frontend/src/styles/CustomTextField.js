import { TextField } from '@mui/material/';
import { styled } from '@mui/material';


const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none',
            textAlign: 'center'
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '2%',
    },
});


export default CustomTextField;

