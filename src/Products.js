
import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as MaterialLink from '@material-ui/core/Link';
import api from "./services/api";
import QrReader from 'react-qr-reader'

export const Styles = styled.div`
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

	.MuiOutlinedInput-input {
		/* imput */
		padding: 15px 14px;
	}
`;


export default class Product extends Component {

	constructor(props) {
		super(props);
		this.state = {
      error: undefined,
      clicked: false,
      valid:false,
      usuario:{},
			notRegisteredDialog: false,
      borrowingCompleteDialog: false,
      user: null,
      details: null,
      id: null
    };
    
	}


  date = moment().format('DD[/]MM [às] h:mm');

  async enviar(obj, id) {
    await api.put(`/books/${id}`, obj);
  }


  componentWillMount() {
    const {details} = this.props.location.state
    this.setState({
      user: JSON.parse(localStorage.getItem(`@bookStatus/Book ID: ${details.id}`)),
      id: details.id,
      details: details
    })

  }

	async enviar(obj, id) {
		let idi = '5f7f73feba32bc3510031ac3';
		await api.put(`/books/${idi}`, obj);
	}

	async fetchUserAppMaster(email) {
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



	async handleSubmit(event) {
		event.preventDefault();
    this.setState(
      {clicked:true}
    )
    
		const email = event.target.elements.email.value;
		console.log(email);
		try {
			const user = await this.fetchUserAppMaster(email);
			console.log(user);

			const userData = {
				emprestimo: {
					user: {
						name: user.name,
						email: user.email,
						date: new Date(),
					},
				},
      };
      

			/** USAR API PARA ENVIAR O LIVRO */
      this.enviar(userData, this.id);
      /** USAR API PARA ENVIAR O LIVRO */
        
      this.setState({
        borrowingCompleteDialog: true,
        usuario: userData,
      });

		} catch (error) {

			if (error.message === '404') {
				this.setState({
					notRegisteredDialog: true,
				});
			}

			this.setState({
				error: error,
			});

			console.log(error.message);
		}

		//window.location.reload();
	}

	handleLogout = () => {
		localStorage.removeItem(`@bookStatus/Book ID: ${this.id}`);
		window.location.reload();
	};

	handleCloseDialog = () => {
		this.setState({
			notRegisteredDialog: false,
		});
  };

  handleCloseDialogBorrowing = () => {
		this.setState({
			borrowingCompleteDialog: false,
		});
	};


  handleScan = data => {
    console.log(data);
    if (data === "https://appmasters.io") {
      this.valid()
    }
  }

  valid(){
    this.enviar(this.state.usuario, this.props.match.params.id)
  }


  handleLogout = () => {
    localStorage.removeItem(`@bookStatus/Book ID: ${this.id}`);
    window.location.reload();
  };

  render() {
    moment.locale("pt-BR");
    function myFunction() {
      var x = document.getElementById("myDIV");
      if (x.style.display !== "none") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
    }

    
    if(this.state.clicked){
      console.log("ALOU",this.id);
      return(
        <div>
        <QrReader
        delay={300}
        onError={this.handleError}
        onScan={this.handleScan}
        style={{ width: '30%' }}
      />
      <Button>Voltar</Button>
      </div>
      )
    }

	render() {
		moment.locale('pt-BR');
		function myFunction() {
			var x = document.getElementById('myDIV');
			if (x.style.display !== 'none') {
				x.style.display = 'none';
			} else {
				x.style.display = 'block';
			}
    }

		const notRegisteredDialog = (
			<Dialog open={this.state.notRegisteredDialog} onClose={this.handleCloseDialog}>
				<DialogTitle id='form-dialog-title'>Você ainda não está cadastrado. </DialogTitle>

				<DialogContent>
					<DialogContentText>
						Para reservar um livro você precisa ter uma conta cadastrada em nossa plataforma.
            Clique no link abaixo para conhecer a plataforma e criar sua conta.
					</DialogContentText>
					<DialogContentText>
          <MaterialLink.default href="https://programador.emjuizdefora.com/" target="_blank" rel="noreferrer" variant="body2">
            https://programador.emjuizdefora.com/
          </MaterialLink.default>
						
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button color='primary' onClick={this.handleCloseDialog}>
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>
    );
    
    const borrowingCompleteDialog = (
			<Dialog open={this.state.borrowingCompleteDialog} onClose={this.handleCloseDialogBorrowing}>
				<DialogTitle id='form-dialog-title'>O livro está reservado!</DialogTitle>

				<DialogContent>
					<DialogContentText>
						Olá {this.state.userName}. Obrigado por reservar o livro.
            Você tem até 3 dias úteis para buscá-lo.
					</DialogContentText>
					
				</DialogContent>
				<DialogActions>
					<Button color='primary' onClick={this.handleCloseDialogBorrowing}>
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>
		);

		if (this.state.user !== null) {
			return (
				<Styles>
          {notRegisteredDialog}
          {borrowingCompleteDialog}
					<Container className='cardGrid'>
						<Button>
							<Link to='/'>
								<ArrowBackIosIcon />
							</Link>
						</Button>
						<Card className='card'>
							<CardMedia
								style={{ paddingTop: '10px' }}
								component='img'
								className='cardMedia'
								image={this.state.details.img}
								title='Image title'
							/>
							<CardContent className='cardContent'>
								<Typography gutterBottom variant='h5' component='h2'>
									{this.state.details.name}
								</Typography>
								<Typography>{this.state.details.autor}</Typography>
								<Typography className='descriptionTitle' variant='h2'>
									Descrição
								</Typography>
								<Typography className='description'>{this.state.details.description}</Typography>
							</CardContent>
							<Box display='flex' justifyContent='center'>
								<Typography className='descriptionTitle' variant='h2'>
									Livro Alugado. Deseja devolvevr?
								</Typography>
								<Button className='btn-devolver' onClick={this.handleLogout} variant='outlined'>
									Devolver
								</Button>
							</Box>
						</Card>
					</Container>
					<Container className='cardGrid'>
						<Card className='card'>
							<Typography variant='h5'>Livro alugado por:</Typography>
							<CardContent className='cardContent'>
								<Table aria-label='simple table'>
									<TableHead>
										<TableRow>
											<TableCell>Nome:</TableCell>
											<TableCell>Data: </TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										<TableRow>
											<TableCell>{this.state.user.nome}</TableCell>
											<TableCell>{this.state.user.dates}</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</CardContent>
						</Card>
						
					</Container>
				</Styles>
			);
		}
		return (
			<Styles>
        {notRegisteredDialog}
        {borrowingCompleteDialog}
				<Container className='cardGrid'>
					<Button>
						<Link to='/'>
							<ArrowBackIosIcon />
						</Link>
					</Button>
					<Card className='card'>
						<CardMedia
							style={{ paddingTop: '10px' }}
							component='img'
							className='cardMedia'
							image={this.state.details.img}
							title='Image title'
						/>
						<CardContent className='cardContent'>
							<Typography gutterBottom variant='h5' component='h2'>
								{this.state.details.name}
							</Typography>
							<Typography>{this.state.details.autor}</Typography>
							<Typography className='descriptionTitle' variant='h2'>
								Descrição
							</Typography>
							<Typography className='description'>{this.state.details.description}</Typography>
						</CardContent>
						<Box display='flex' justifyContent='center'>
							<Button onClick={myFunction} variant='outlined'>
								Alugar
							</Button>
						</Box>
						<form id='myDIV' style={{ display: 'none' }} onSubmit={this.handleSubmit.bind(this)}>
							<Typography>Deseja alugar esse livro?</Typography>

							<Typography>Insira seu email:</Typography>
							<TextField
								id='standard-secondary'
								label='Seu email'
								variant='outlined'
								type='text'
								name='email'
								required
							/>
							<Button className='btn-form' type='submit' variant='outlined'>
								Pegar
							</Button>
						</form>
					</Card>
				</Container>
			</Styles>
		);
	}
}
