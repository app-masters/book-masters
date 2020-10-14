import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@material-ui/core';

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

const NotRegisteredDialog = (props) => {
	return (
		<Dialog open={props.open} onClose={props.onClose}>
				<DialogTitle id='form-dialog-title'>Você ainda não está cadastrado. </DialogTitle>

				<DialogContent>
					<DialogContentText>
						Para reservar um livro você precisa ter uma conta cadastrada em nossa plataforma. Clique no link
						abaixo para conhecer a plataforma e criar sua conta.
					</DialogContentText>
					<DialogContentText>
						<Link
							href='https://programador.emjuizdefora.com/'
							target='_blank'
							rel='noreferrer'
							variant='body2'
						>
							https://programador.emjuizdefora.com/
						</Link>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button color='primary' onClick={props.onClose}>
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>
	);
};

export default NotRegisteredDialog;
