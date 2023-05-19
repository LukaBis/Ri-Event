import { makeStyles, styled } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 400,
        margin: '0 auto',
        marginTop: '2em',
        marginbottom: '.5em'

    },
    textField: {
        marginbottom: 0,
        maxHeight: 1400,
        paddingBottom: 0
    },
    submitButton: {
        margin: 10,
    },
}));

export default useStyles;