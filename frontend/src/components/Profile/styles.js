const styles = {
    profileField: {
        '& .MuiInputBase-input': {
            marginBottom: 0,
            boxShadow: 'none',
            backgroundColor: 'transparent' 
        },
        mt: 3
    },
    alert: {
        width: '280px',
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000 rounded',
        borderRadius: '10px',
        boxShadow: 24,
        p: 4,
        color: 'black'
    }
};

export default styles;