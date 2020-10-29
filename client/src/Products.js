import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Paper, Snackbar, TextField} from '@material-ui/core';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Alert } from '@material-ui/lab';
import api from './services/api';
import ConfirmLending from './components/ConfirmLending';
import NotRegisteredDialog from './components/NotRegisteredDialog';
import { product } from './assets/css/makeStyles';
import { Grid } from '@material-ui/core';
import AlertSnackbar from './components/AlertSnackbar';



export const Styles = styled.div`
	/*
	.MuiContainer-root {
		margin-top: 50px;
	}
	.MuiPaper-root {
		width: 420px;
		margin: auto;
		margin-bottom: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.MuiCardMedia-media {
		width: 240px;
	}
	.MuiTypography-body1 {
		text-align: center;
	}
	.MuiButtonBase-root {
		margin-top: 50px;
	}
	.MuiTypography-h5 {
		font-size: 1.5rem;
		font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
		font-weight: 500;
		line-height: 1.334;
		letter-spacing: 0em;
		text-align: center;
	}
	.MuiPaper-elevation1 {
		box-shadow: inset 0px -3px 0px 0px rgba(10, 182, 255), 0px 0px 0px 0px rgba(0, 0, 0, 0.14),
			0px 0px 3px 0px rgba(0, 0, 0, 0.12);
	}
	.MuiCardContent-root {
		padding: 14px 8px 8px 8px;
		height: auto;
	}
	.MuiButton-outlined {
		border: 1px solid #0ab6ff;
		color: #0ab6ff;
		padding: 5px 15px;
		margin: 50px 5px 20px 5px;

		&:hover {
			background-color: #0ab6ff;
			color: #fff;
			.MuiButton-label a {
				color: #fff;
			}
		}
		.MuiButton-label a {
			text-decoration: none;
			color: #0ab6ff;
		}
	}
	*/
	.container {
		margin-top: 100px;

	}
	.descriptionTitle {
		font-size: 18px;
		margin: 10px 0;
		font-weight: 500;
		font-family: Roboto, sans-serif;
		color: #343a40;
	}
	.description {
		font-weight: 300;
		font-style: normal;
		font-size: 15px;
		color: #6c757d;
	}
	.btn-form {
		border: 1px solid #0ab6ff;
		color: #0ab6ff;
		padding: 11px 15px;
		margin: 0px 5px 10px 5px;
	}
	.cardInfo {
		margin-bottom: 10px;
		justify-content: center;
		align-items: center;

		display: flex;
		flex-direction: row;
	}
	.buttonOutlined {
		border: 1px solid #0ab6ff;
		color: #0ab6ff;
		padding: 5px 15px;

		&:hover {
			background-color: #0ab6ff;
			color: #fff;
			a {
				color: #fff;
			}
		}
		a {
			text-decoration: none;
			color: #0ab6ff;
		}
	}
	.returnButton {
		padding: 15px;
		margin-bottom: 10px;
		a {
			display: flex;
			flex-direction: row;
			align-items: center;
			text-decoration: none;
		}
	}
	.bookCover {
		width: 80%;
		max-width: 250px;
    	margin: 0 20px 0 20px;
	}
	.formLine {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		margin-bottom: 15px;
		width: 80%;
	}
	.formText {
		
	}
	.formInput{
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-grow:1;

	}
	.textField {
		width: 100%;
		margin-right: 10px;
	}
	/** Isso é só pra ficar com a bordinha azul embaixo*/
	.MuiPaper-elevation1 {
		box-shadow: inset 0px -3px 0px 0px rgba(10, 182, 255), 0px 0px 0px 0px rgba(0, 0, 0, 0.14),
			0px 0px 3px 0px rgba(0, 0, 0, 0.12);
	}

`;


export const Product = (props) =>  {
	//console.log(props)

	const [error, setError] = useState(undefined);
	const [clicked, setClicked] = useState(false);
	const [valid, setValid] = useState(false);
	const [notRegisteredDialog, setNotRegisteredDialog] = useState(false);
	const [borrowingCompleteDialog, setBorrowingCompleteDialog] = useState(false);
	const [borrowingSuccessful, setBorrowingSuccessfulDialog] = useState(false);
	const [borrowingError, setBorrowingError] = useState(false);
	const [user, setUser] = useState(null);
	const [details, setDetails] = useState(props.location.state);
	const [id, setId] = useState(props.location.state.id);
	
	const [showForm, setShowForm] = useState(false);

	const date = moment().format('DD[/]MM [às] h:mm');

	const lendBook = async(apiData) => {
		try {
			console.log(apiData)
			const response = await api.post(`/lending/`, apiData);

			//console.log(response)
			
			if (response.status !== 200) {
				throw new Error('Não foi possível realizar o empréstimo');
			} 
		} catch (error) {
			//console.log(error);
			throw error;
		}
	}

	const fetchUserAppMaster = async (email) => {
		try {
			const response = await fetch(`https://programador.emjuizdefora.com/api/user/public?email=${email}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			});
			console.log(response);
			if (response.status === 404) {
				throw new Error(response.status, 'Usuário não encontrado');
			} else if (response.ok) {
				const user = response.json();

				console.log(user);
				return user;
			} else {
				throw new Error(response.status, 'Erro ao consultar a API');
			}
		} catch (error) {
			throw error;
		}
	}

	const handleSubmit = async(event) =>{
		event.preventDefault();

		const email = event.target.elements.email.value;
		console.log(email);
		try {
			const user = await fetchUserAppMaster(email);
			console.log(user);

			const userData = {
				name: user.name,
				email: user.email,
				phoneNumber: user.phoneNumber,
			};
			setBorrowingCompleteDialog(true)
			setUser(userData)

		} catch (error) {
			if (error.message === '404') {
				setNotRegisteredDialog(true)
			}

			setError(error);

			console.log(error.message);
		}
	}


	const handleCloseDialog = () => {
		setNotRegisteredDialog(false)
	};

	const handleCloseDialogBorrowing = () => {
		setBorrowingCompleteDialog(false)
	};

	const handleConfirmBorrowing = () => {
		setClicked(true)
	};

	const handleReturnQRCode = () => {
		setClicked(false)
	};

	const handleScan = (data) => {
		console.log(data);
		if (data === 'https://appmasters.io') {
			isValid();
			setClicked(false)
			setBorrowingCompleteDialog(false)
		}
	};

	const isValid = async () =>{
		const apiData = {
			id_book: id,
			person: user,
		};

		try {
			/** USAR API PARA ENVIAR O LIVRO */
			await lendBook(apiData);
			/** USAR API PARA ENVIAR O LIVRO */
		} catch (error) {
			setClicked(false)
			setBorrowingCompleteDialog(false)
			setBorrowingSuccessfulDialog(false)
			setBorrowingError(true)
			console.log(error);
			
			return;
		}

		setClicked(false)
		setBorrowingCompleteDialog(true)
		setBorrowingSuccessfulDialog(true)
		//this.enviar(this.state.usuario, this.id)
	}

	const handleCloseAlert = () => {
		setBorrowingSuccessfulDialog(false)
		setBorrowingError(false)
	};

	const handleQRCodeError = () => {
		setBorrowingError(true)
	};

	moment.locale('pt-BR');
	

	/*
	// if (this.state.details.status === 'true') {
	// 	return (
	// 		<Styles>
	// 			<Container className={product().container} maxWidth="md">
	// 				<Grid item xs={12} justify="flex-start" container>
	// 					<Button>
	// 						<Link to='/'>
	// 							<ArrowBackIosIcon />
	// 						</Link>
	// 					</Button>
	// 				</Grid>

	// 				<Card className={product().root}>
	// 					<div className={product().details}>
	// 						<CardContent className={product().content}>
	// 						<Typography component="h5" variant="h5">
	// 							Live From Space
	// 						</Typography>
	// 						<Typography variant="subtitle1" color="textSecondary">
	// 							Mac Miller
	// 						</Typography>
	// 						</CardContent>
	// 						<div className={product().controls}>
	// 						<IconButton aria-label="previous">
	// 							{theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
	// 						</IconButton>
	// 						<IconButton aria-label="play/pause">
	// 							<PlayArrowIcon className={product().playIcon} />
	// 						</IconButton>
	// 						<IconButton aria-label="next">
	// 							{theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
	// 						</IconButton>
	// 						</div>
	// 					</div>
	// 					<CardMedia
	// 						className={product().cover}
	// 						image="/static/images/cards/live-from-space.jpg"
	// 						title="Live from space album cover"
	// 					/>
	// 				</Card>





					
	// 				<Card className='card'>
	// 					<CardMedia
	// 						style={{ paddingTop: '10px' }}
	// 						component='img'
	// 						className='cardMedia'
	// 						image={this.state.details.img}
	// 						title='Image title'
	// 					/>
	// 					<CardContent className='cardContent'>
	// 						<Typography gutterBottom variant='h5' component='h2'>
	// 							{this.state.details.name}
	// 						</Typography>
	// 						<Typography>{this.state.details.autor}</Typography>
	// 						<Typography className='descriptionTitle' variant='h2'>
	// 							Descrição
	// 						</Typography>
	// 						<Typography className='description'>{this.state.details.description}</Typography>
	// 					</CardContent>
	// 					<Box display='flex' justifyContent='center'>
	// 						<Typography className='descriptionTitle' variant='h2'>
	// 							Livro Alugado. Deseja devolvevr?
	// 						</Typography>
	// 						<Button className='btn-devolver' onClick={this.handleLogout} variant='outlined'>
	// 							Devolver
	// 						</Button>
	// 					</Box>
	// 				</Card>
	// 			</Container>
	// 			<Container className='cardGrid'>
	// 				<Card className='card'>
	// 					<Typography variant='h5'>Livro alugado por:</Typography>
	// 					<CardContent className='cardContent'>
	// 						<Table aria-label='simple table'>
	// 							<TableHead>
	// 								<TableRow>
	// 									<TableCell>Nome:</TableCell>
	// 									<TableCell>Data: </TableCell>
	// 								</TableRow>
	// 							</TableHead>
	// 							<TableBody>
	// 								<TableRow></TableRow>
	// 							</TableBody>
	// 						</Table>
	// 					</CardContent>
	// 				</Card>
	// 				<Snackbar
	// 					open={this.state.borrowingError}
	// 					autoHideDuration={6000}
	// 					onClose={this.handleCloseAlert.bind(this)}
	// 				>
	// 					<Alert onClose={this.handleCloseAlert.bind(this)} severity='error'>
	// 						Erro ao emprestar o livro. Tente novamente.
	// 					</Alert>
	// 				</Snackbar>

	// 				<Snackbar
	// 					open={this.state.borrowingSuccessful}
	// 					autoHideDuration={6000}
	// 					onClose={this.handleCloseAlert.bind(this)}
	// 				>
	// 					<Alert onClose={this.handleCloseAlert.bind(this)} severity='success'>
	// 						Livro emprestado com sucesso!
	// 					</Alert>
	// 				</Snackbar>
	// 			</Container>
	// 		</Styles>
	// 	);
	// }
	*/
	
	
	/** TODO: alterar a forma que esse modal é aberto */
	const checkUser = () => {
		if(user){
			return(
				<ConfirmLending
					open={borrowingCompleteDialog}
					onClose={handleCloseDialogBorrowing}
					onConfirm={handleConfirmBorrowing}
					name={user.name}
					handleReturnQRCode={handleReturnQRCode}
					handleError={handleQRCodeError}
					handleScan={handleScan}
				/>
			)
		} else {
			return(
			<NotRegisteredDialog
				open={notRegisteredDialog}
				onClose={handleCloseDialog}
			/>
			)
		}
	}

	return (
		<Styles>
			
			<Container className='container'>
				{checkUser()}
				
				<Paper className='cardInfo'>
				<Grid container justify='flex-start' spacing={2} >
					<Grid item xs={12} >
						{/** TODO: componentizar esse botão? */}
						<Button className='returnButton'>
							<Link to='/'>
								<ArrowBackIosIcon /> Voltar
							</Link>
						</Button>
					</Grid>
					<Grid item xs={12} sm={4}>
						<img
							className='bookCover'
							src={details.img}
							alt='BookCover'
						/>
					</Grid>
					<Grid item xs={12} sm={8}>
						<div className='cardContent'>
							<Typography gutterBottom variant='h5' component='h2'>
								{details.name}
							</Typography>
							<Typography>{details.autor}</Typography>
							<Typography className='descriptionTitle' variant='h2'>
								Descrição
							</Typography>
							<Typography className='description'>{details.description}</Typography>
						</div>
					</Grid>

					<Grid item xs={12} >
						<Box display='flex' justifyContent='center'>
							<Button className='buttonOutlined' onClick={() => setShowForm(!showForm)} variant='outlined'>
								Alugar
							</Button>
						</Box>
					</Grid>
					<Grid item xs={12}  >
						{showForm && 
							(<form id='myDIV'  onSubmit={handleSubmit.bind(this)} className='formLine'>
								<div className='formText'>
									<Typography>Deseja alugar esse livro?</Typography>
									<Typography>Insira seu email:</Typography>
								</div>
								
								<div className='formInput'>
								<TextField
									id='standard-secondary'
									label='Seu email'
									variant='outlined'
									type='text'
									name='email'
									required
									className='textField'
								/>
								<Button className='buttonOutlined' type='submit' variant='outlined'>
									Pegar
								</Button>
								</div>
							</form>)
						}
					</Grid>

				</Grid>
					

					
					
					
					
				</Paper>

				<AlertSnackbar
					open={borrowingError | borrowingSuccessful}
					onClose={handleCloseAlert.bind(this)}
					severity={borrowingError ? 'error' : 'success'}
					message={borrowingError ? 
						'Erro ao emprestar o livro. Tente novamente.' : 
						'Livro emprestado com sucesso!'
						}	
				/>

			</Container>
		</Styles>
	);
}

export default Product

