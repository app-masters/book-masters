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
import { Paper, Snackbar, TextField } from '@material-ui/core';
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
import { Grid} from '@material-ui/core';
import AlertSnackbar from './components/AlertSnackbar';
import { Link as RouterLink } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InputAdornment from '@material-ui/core/InputAdornment';
import DetailedBookCard from './components/DetailedBookCard';
import LendingCard from './components/LendingCard'

export const Product = (props) => {
	console.log(props)

	const [error, setError] = useState(undefined);
	const [clicked, setClicked] = useState(false);
	const [valid, setValid] = useState(false);
	const [notRegisteredDialog, setNotRegisteredDialog] = useState(false);
	const [borrowingCompleteDialog, setBorrowingCompleteDialog] = useState(false);
	const [borrowingSuccessful, setBorrowingSuccessfulDialog] = useState(false);
	const [borrowingError, setBorrowingError] = useState(false);
	const [user, setUser] = useState(null);
	const [details, setDetails] = useState(props.location.state);
	const [id, setId] = useState(props.location.state._id);
	const [lendings, setLendings] = useState([])
	const [formOpt, setFormOpt] = useState("")

	const [showForm, setShowForm] = useState(false);

	const date = moment().format('DD[/]MM [às] h:mm');

	const classes = product()

	useEffect( () => {
		getLendings()
	}, [])

	const getLendings = async () => {
		try {
			const response = await api.get('/lendings/book/' + id);
			if (response.status !== 200) {
			  throw Error(response.statusText);
			}
			const json = response.data;
			console.log(json)
			setLendings(json.lendings)
		}catch(error){

		}
	}

	const lendBook = async (apiData) => {
		try {
			console.log(apiData);
			const response = await api.post(`/lendings/`, apiData);

			//console.log(response)

			if (response.status !== 200) {
				throw new Error('Não foi possível realizar o empréstimo');
			}
		} catch (error) {
			//console.log(error);
			throw error;
		}
	};

	const reserveBook = async (apiData) => {
		try {
			console.log(apiData);
			const response = await api.post(`/lendings/reserve`, apiData);

			//console.log(response)

			if (response.status !== 200) {
				throw new Error('Não foi possível realizar a reserva');
			}
		} catch (error) {
			//console.log(error);
			throw error;
		}
	};

	const returnBook = async (apiData) => {
		try {
			console.log(apiData);
			const response = await api.post(`/lendings/return`, apiData);

			//console.log(response)

			if (response.status !== 200) {
				throw new Error('Não foi possível realizar a devolução');
			}
		} catch (error) {
			//console.log(error);
			throw error;
		}
	};

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
	};


	const handleSubmit = async (event) => {
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
			setBorrowingCompleteDialog(true);
			setUser(userData);
			if(formOpt === "reservar"){

				reserveBook(
					{
					id_book: id,
					person: user,
				})
			}
		} catch (error) {
			if (error.message === '404') {
				setNotRegisteredDialog(true);
			}

			setError(error);

			console.log(error.message);
		}
	};

	const handleCloseDialog = () => {
		setNotRegisteredDialog(false);
	};

	const handleCloseDialogBorrowing = () => {
		setBorrowingCompleteDialog(false);
	};

	const handleConfirmBorrowing = () => {
		setClicked(true);
	};

	const handleReturnQRCode = () => {
		setClicked(false);
	};

	const handleScan = (data) => {
		console.log(data);
		if (data === 'https://appmasters.io') {
			isValid();
			setClicked(false);
			setBorrowingCompleteDialog(false);
		}
	};

	const isValid = async () => {
		const apiData = {
			id_book: id,
			person: user,
		};

		try {
			/** USAR API PARA ENVIAR O LIVRO */
			if(formOpt === "pegar"){
				await lendBook(apiData);
			}else if (formOpt === "devolver"){
				await returnBook(apiData);
			}
			
			/** USAR API PARA ENVIAR O LIVRO */
		} catch (error) {
			setClicked(false);
			setBorrowingCompleteDialog(false);
			setBorrowingSuccessfulDialog(false);
			setBorrowingError(true);
			console.log(error);

			return;
		}

		setClicked(false);
		setBorrowingCompleteDialog(true);
		setBorrowingSuccessfulDialog(true);
		//this.enviar(this.state.usuario, this.id)
	};

	const handleCloseAlert = () => {
		setBorrowingSuccessfulDialog(false);
		setBorrowingError(false);
	};

	const handleQRCodeError = () => {
		setBorrowingError(true);
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

	const form = (option) => {
		return (
			<form id='actionForm' onSubmit={handleSubmit.bind(this)} style={{marginBottom:"40px"}}>
				<Grid container spacing={3} direction="column" alignItems="center" >
					<Grid item >
						<Typography variant="h5">Deseja {formOpt} esse livro?</Typography>
					</Grid>
					<Grid item xs={12} style={{width:"70%"}}>
						<TextField
							id='standard-secondary'
							label='E-mail'
							variant='outlined'
							type='text'
							name='email'
							required
							className={classes.textField}
							placeholder='Insira seu email'
							InputProps={{
								startAdornment: (
								<InputAdornment position="start">
									<MailOutlineIcon />
								</InputAdornment>
								),
							}}
						/>
					</Grid>	
					<Grid item>
						<Button className={classes.buttonOutlined} type='submit' variant='outlined'>
							{formOpt}
						</Button>
					</Grid>
				</Grid>
			</form>
		)		
	}

	const setForm = (opt) => {
		setShowForm(!showForm)
		setFormOpt(opt)
	}

	const checkUser = () => {
		if (user && formOpt !== "reservar") {
			return (
				<ConfirmLending
					open={borrowingCompleteDialog}
					onClose={handleCloseDialogBorrowing}
					onConfirm={handleConfirmBorrowing}
					name={user.name}
					handleReturnQRCode={handleReturnQRCode}
					handleError={handleQRCodeError}
					handleScan={handleScan}
					formOpt={formOpt}
				/>
			);
		} else {
			return <NotRegisteredDialog open={notRegisteredDialog} onClose={handleCloseDialog} />;
		}
	};

	const userActions = () => {
		if(details.status === "Reservado"){
			return(
				<Button
					className={classes.buttonOutlined}
					onClick={() => setForm("pegar")}
					variant='outlined'
				>
					Pegar
				</Button>
			)
		}else if (details.status === "Emprestado"){
			return(
				<Button
					className={classes.buttonOutlined}
					onClick={() => setForm("devolver")}
					variant='outlined'
				>
					Devolver
				</Button>
			)
		}
	}

	return (
		<Grid container className={classes.container} lg="auto" spacing={3}>
			{checkUser()}
			<Grid item xs={12}>
				<Button 
					component={RouterLink} 
					to="/" size="large" 
					color="primary"
					size="large"
					className={classes.button}
					startIcon={<ArrowBackIosIcon />}>
				Voltar
				</Button>
			</Grid>
			<Grid item xs={12} lg={12} md={12}>
				<DetailedBookCard 
					img={details.img} 
					title={details.title} 
					autor={details.autor} 
					description={details.description}
					tags={details.tag}
				/>
			</Grid>
			<Grid item xs={12} lg={8} md={8} alignItems="space-around" justify="space-around" style={{display:"flex"}}>
				<Button
					className={classes.buttonOutlined}
					onClick={() => setForm("reservar")}
					variant='outlined'
				>
					Reservar
				</Button>
				{userActions()}
			</Grid>
			<Grid item xs={8} lg={8} md={8}>
				{showForm && (
					form()
				)}
			</Grid>
			<Grid item xs={12} lg={4} md={4}>
				<LendingCard lendings={lendings}/>
			</Grid>
			<AlertSnackbar
				open={borrowingError | borrowingSuccessful}
				onClose={handleCloseAlert.bind(this)}
				severity={borrowingError ? 'error' : 'success'}
				message={
					borrowingError ? 'Erro ao emprestar o livro. Tente novamente.' : 'Livro emprestado com sucesso!'
				}
			/>
		</Grid>
	);
};

export default Product;
