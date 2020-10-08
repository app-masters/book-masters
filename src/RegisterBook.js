import {
	Button,
	Container,
	createStyles,
	CssBaseline,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
	Grid,
    IconButton,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core';
import { SearchRounded } from '@material-ui/icons';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

export const Styles = styled.div`
	.MuiContainer-root {
        margin-top: 80px;
        margin-bottom: 20px;
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
		padding: 5px;
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

	.MuiOutlinedInput-input {
		/* imput */
		padding: 15px 14px;
	}
`;

const useStyles = makeStyles((theme) =>
	createStyles({
		formRow: {
			marginBottom: 20,
		},
		buttonSearch: {
			height: '100%',
        },
        buttonSubmit: {
            width: '100%'
        }
	})
);

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
    const [ISBN, setISBN] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [authors, setAuthors] = useState("");
    const [editor, setEditor] = useState("");
    const [tags, setTags] = useState("");
    const [coverURL, setCoverURL] = useState("");
    const [year, setYear] = useState("");
    const [edition, setEdition] = useState("");
    const [googleBooksInfo, setGoogleBooksInfo] = useState("");
    const [googleBooksResponse, setGoogleBooksResponse] = useState("");
    
    const [openDialog, setOpenDialog] = useState(false);

    const handleSubmitRegister = useCallback( (e) => {
        e.preventDefault();

        /**Tratar dados do formulário */
        const authorsArray = authors.split(';');
        const tagsArray = tags.split(';');

        /**Adicioná-los ao objeto */
        const serverBook = JSON.stringify({
            isbn: ISBN,
            title,
            description,
            autor: authorsArray,
            editora: editor,
            tag: tagsArray,
            img: coverURL,
            anoPublicacao: year,
            edicao: edition,
            status: false,
        })
        console.log(serverBook)

    },[ISBN, title, description, authors, editor, tags, coverURL,year, edition]);



    const searchGoogleAPI = useCallback(async () => {

        setOpenDialog(true)
        console.log("GoogleAPI")

        /** Fetch google API */
        const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + ISBN, {
			method: 'GET',
        })
        
        if(!response.ok){
            console.log("Erro ao consumir API")
            return;
        }

        const responseData = response.json();
        console.log(responseData)
        

    }, [ISBN]);

    const GoogleInfoDialog = (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby='form-dialog-title'>
            <DialogTitle id='form-dialog-title'>Informações obtidas</DialogTitle>

            <DialogContent>
                Teste Google
            </DialogContent>

            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color='secondary'>
                    Cancelar
                </Button>
                <Button onClick={() => setOpenDialog(false)}  color='primary'>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );

	return (
		<React.Fragment>
			<Styles>
				<Container className='cardGrid'>
					<Typography variant='h3'>Registrar Novo Livro</Typography>
					<form id='book-form'  onSubmit={e => handleSubmitRegister(e)}  autoComplete='off'>
						<Grid justify="center" alignItems="center" container spacing={3}>
							<Grid item xs={10}>
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

							<Grid item xs={2} >
                            <IconButton onClick={() => searchGoogleAPI()} aria-label="search" >
                                <SearchRounded fontSize="large" />
                            </IconButton>
							</Grid>

                            {GoogleInfoDialog}

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
						</Grid>

						<Grid item xs={12}>
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
						<Grid  justify="center" alignItems="center" container item xs={12} spacing={3}>
							<Grid item xs={12} sm={4}>
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

							<Grid item xs={12} sm={4}>
								<TextField
									id='form-edition'
                                    label='Edição'
                                    type="number"
									style={{ margin: 8 }}
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
							<Grid item xs={12} sm={4}>
								<TextField
									id='form-pages'
                                    label='Páginas'
                                    type="number"
									style={{ margin: 8 }}
									placeholder='Páginas'
									fullWidth
									margin='normal'
									InputLabelProps={{
										shrink: true,
									}}
									variant='outlined'
								/>
							</Grid>
						</Grid>
                        <Grid container item justify="flex-end" xs={12}>
                            <Button className={useStyles.buttonSubmit} size="large" variant='contained' form='book-form' type='submit' color='primary'>
                                Salvar
                            </Button>
                        </Grid>
					</form>

				</Container>
			</Styles>
		</React.Fragment>
	);
};

export default RegisterBook;
