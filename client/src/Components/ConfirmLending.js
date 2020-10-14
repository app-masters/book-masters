import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export const Styles = styled.div`
	.root {
		display: flex;
		height: 200px;
	}
	.cover {
		width: 151px;
		padding-top: 20px;
	}
	.details {
		display: flex;
		flex-direction: column;
	}
	.content {
		flex: '1 0 auto';
	}
	.teste {
		text-align: center;
	}
`;

const ConfirmLending = (props) => {
	return (
		<Dialog open={props.open} onClose={props.onClose}>
			<DialogTitle id='form-dialog-title'>Ler QRCode</DialogTitle>

			<DialogContent>
				<DialogContentText>
					Olá {props.name}. Obrigado por utilizar nossa plataforma. Clique em "Confirmar" para
					ler o QRCode e confirmar seu empréstimo.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color='secondary' onClick={props.onClose}>
					Cancelar
				</Button>
				<Button color='primary' onClick={props.onConfirm}>
					Confirmar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmLending;
