import React from 'react'
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import QrReader from 'react-qr-reader';
import {confirmLending} from '../css/makeStyles'

const ConfirmLending = (props) => {
	const classes = confirmLending();

	const action = () => {
		if(props.formOpt === "pegar"){
			return("o empréstimo")
		}else if(props.formOpt === "devolver"){
			return("a devolução")
		}
	}

	return (
		<Dialog open={props.open} onClose={props.onClose}>
			<DialogTitle id='form-dialog-title'>Ler QRCode</DialogTitle>

			<DialogContent className={classes.content}>
				<DialogContentText >
					Olá {props.name}. Obrigado por utilizar nossa plataforma. 
					Leia o QRCode para confirmar {action()}.
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
