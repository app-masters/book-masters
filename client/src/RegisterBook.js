import { Button, Container, Grid, IconButton, TextField, Typography, } from '@material-ui/core';
import { SearchRounded } from '@material-ui/icons';
import React, { useCallback, useState } from 'react';
import fetchBookGoogle from './services/googleBooksAPI';
import api from './services/api';
import SaveIcon from '@material-ui/icons/Save';
import { Redirect, useHistory } from "react-router-dom";

import {register} from "./assets/css/makeStyles"

/*
	ISBN: string ok
	TITULO: string ok
	DESCRICAO: string ok
	AUTOR Array<String> 
	EDITORA: string ok
	TAG: Array<string>
	IMG: link (string)
	ANO PUBLICAO: number
	EDIÇÃO: number (editado) 
*/


const RegisterBook = () => {

	const classes = register();
	const history = useHistory();

	const [ISBN, setISBN] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [authors, setAuthors] = useState("");
	const [editor, setEditor] = useState("");
	const [tags, setTags] = useState("");
	const [coverURL, setCoverURL] = useState("");
	const [year, setYear] = useState("");
	const [edition, setEdition] = useState("");
	const [redirect, setRedirect] = useState(false);

	async function enviar(obj) {
		try {
			await api.post('/books', obj);
		} catch (e) {
			throw e;
		}
		
	}

	const handleSubmitRegister = useCallback((e) => {
		e.preventDefault();

		/**Tratar dados do formulário */
		console.log(authors);
		
		/**Adicioná-los ao objeto */
		const serverBook = {
			isbn: ISBN,
			title,
			description,
			autor: authors,
			editora: editor,
			tag: tags,
			img: coverURL? (coverURL):("https://avancar.gov.br/avancar-web/images/slideshow/not-found.png"),
			anoPublicacao: year,
			edicao: edition,
			status: false,
		}

		console.log(serverBook)
		try {
			enviar(serverBook);
			//setRedirect(true);
		} catch (error) {
			console.log(error.message);
		}
		

	}, [ISBN, title, description, authors, editor, tags, coverURL, year, edition]);



	const searchGoogleAPI = useCallback(async () => {

		console.log("GoogleAPI")

		const bookRes = await fetchBookGoogle(ISBN);

		if (bookRes.totalItems > 0) {

			const book = bookRes.items[0]
			console.log(book)
			setTitle(book.volumeInfo.title)
			setDescription(book.volumeInfo.description)
			setAuthors(book.volumeInfo.authors)
			setEditor(book.volumeInfo.publisher)
			if (book.volumeInfo.imageLinks) {
				setCoverURL(book.volumeInfo.imageLinks.thumbnail)
			}


			if (book.categories) {
				const cat = book.categories
				setTags(cat.reduce((tag, val) => {
					val += tag + ";";
				}, ['']))
			}

			if (book.volumeInfo.authors) {

				setAuthors( book.volumeInfo.authors)
			}

			// setYear(book.volumeInfo.publishedDate)
		}

	}, [ISBN]);

	if (redirect) {
		return <Redirect to='/'/>;
	}


	return (
		<Container className={classes.container} maxWidth="md" fluid>
			
			<Typography variant='h3' className={classes.title}>Registrar Novo Livro</Typography>
			
			<form id='book-form' onSubmit={e => handleSubmitRegister(e)} autoComplete='off' style={{ paddingTop: 40}}>
				
				<Grid justify="center" alignItems="center" container spacing={3}>
					
					<Grid item xs={11}>
						<TextField
							id='form-isbn'
							label='ISBN'
							style={{ margin: 8 }}
							placeholder='ISBN'
							fullWidth
							value={ISBN}
							onChange={(val) => setISBN(val.target.value)}
							margin='normal'
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
						/>
					</Grid>
					<Grid item xs={1} justify="flex-end" container>
						<IconButton onClick={() => searchGoogleAPI()} aria-label="search" >
							<SearchRounded fontSize="large" />
						</IconButton>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id='form-title'
							label='Título'
							required
							style={{ margin: 8 }}
							placeholder='Título'
							fullWidth
							value={title}
							onChange={(val) => setTitle(val.target.value)}
							margin='normal'
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id='form-author'
							required
							label='Autor'
							style={{ margin: 8 }}
							placeholder='Autor'
							fullWidth
							value={authors}
							onChange={(val) => setAuthors(val.target.value)}
							margin='normal'
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id='form-description'
							label='Descrição'
							style={{ margin: 8 }}
							placeholder='Descrição'
							fullWidth
							multiline
							value={description}
							onChange={(val) => setDescription(val.target.value)}
							margin='normal'
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id='form-editor'
							label='Editora'
							required
							style={{ margin: 8 }}
							placeholder='Editora'
							fullWidth
							value={editor}
							onChange={(val) => setEditor(val.target.value)}
							margin='normal'
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
						/>
					</Grid>
					<Grid item xs={12} >
						<TextField
							id='form-tags'
							label='Tags'
							style={{ margin: 8 }}
							placeholder='Tags'
							fullWidth
							value={tags}
							onChange={(val) => setTags(val.target.value)}
							margin='normal'
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
						/>
					</Grid>
					<Grid item xs={12} >
						<TextField
							id='form-cover'
							label='Capa'
							helperText='Informe a URL para a imagem da capa.'
							style={{ margin: 8 }}
							placeholder='Capa'
							fullWidth
							value={coverURL}
							onChange={(val) => setCoverURL(val.target.value)}
							margin='normal'
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
							<TextField
								id='form-year'
								label='Ano de publicação'
								style={{ margin: 8 }}
								placeholder='Ano de publicação'
								fullWidth
								type="number"
								value={year}
								onChange={(val) => setYear(val.target.value)}
								margin='normal'
								InputLabelProps={{
									shrink: true,
								}}
								variant='outlined'
							/>
						</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id='form-edition'
							label='Edição'
							type="number"
							style={{ margin: 8, marginRight:0, }}
							placeholder='Edição'
							fullWidth
							value={edition}
							onChange={(val) => setEdition(val.target.value)}
							margin='normal'
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
						/>
					</Grid>
					<Grid container item justify="flex-end" xs={12} style={{ paddingTop: 40, paddingBottom:50,}}>
						<Button
							variant="contained"
							color="primary"
							size="large"
							className={classes.button}
							startIcon={<SaveIcon />}
							form='book-form' 
							type='submit'
						>
							Save
						</Button>
					</Grid>
				
				</Grid>
			</form>
		</Container>
	);
};

export default RegisterBook;
