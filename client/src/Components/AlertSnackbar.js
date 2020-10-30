import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';

const AlertSnackbar = (props) => {
	return (
		<Snackbar
            open={props.open}
            autoHideDuration={6000}
            onClose={props.onClose}
        >
            <Alert onClose={props.onClose} severity={props.severity}>
                {props.message}
            </Alert>
        </Snackbar>
	);
};

export default AlertSnackbar;
