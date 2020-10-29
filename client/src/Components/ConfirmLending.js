import React from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from '@material-ui/core';
import QrReader from 'react-qr-reader';

const useStyles = makeStyles((theme) => ({
    qrCode:{
		width: '40%'
	},
	content:{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	}
  })); 

const ConfirmLending = (props) => {
	const classes = useStyles();

	return (
		<Dialog open={props.open} onClose={props.onClose}>
			<DialogTitle id='form-dialog-title'>Ler QRCode</DialogTitle>

			<DialogContent className={classes.content}>
				<DialogContentText >
					Olá {props.name}. Obrigado por utilizar nossa plataforma. 
					Leia o QRCode para confirmar o empréstimo.
				</DialogContentText>
				
				<QrReader
					className={classes.qrCode}
					delay={300}
					onError={props.handleError}
					onScan={props.handleScan}
				/>
				
				

			</DialogContent>
			<DialogActions>
				<Button color='secondary' onClick={props.onClose}>
					Cancelar
				</Button>
				
				{/*
				<Button onClick={props.handleReturnQRCode.bind(props)}>Voltar</Button>
				<Button color='primary' onClick={props.onConfirm}>
					Confirmar
				</Button>*/}
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmLending;
