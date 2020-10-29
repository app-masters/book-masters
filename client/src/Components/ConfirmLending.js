import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
