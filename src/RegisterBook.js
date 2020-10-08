import {
	Button,
	Container,
	createStyles,
	CssBaseline,
	Grid,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
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


	return (
		<React.Fragment>
			<Styles>
				<Container className='cardGrid'>
					<Typography variant='h3'>Registrar Novo Livro</Typography>
					<form noValidate autoComplete='off'>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={10}>
								<TextField
									id='form-isbn'
									label='ISBN'
									style={{ margin: 8 }}
									placeholder='ISBN'
									helperText='Você pode pesquisar o livro pelo ISBN'
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

							<Grid item xs={12} md={2}>
								<Button variant='contained' color='primary' disableElevation>
									Pesquisar
								</Button>
							</Grid>

							<Grid item xs={12}>
								<TextField
									id='form-title'
									label='Título'
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
									id='form-title'
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
									id='form-title'
									label='Editora'
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
						<Grid container item xs={12} spacing={3}>
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
                        <Grid item xs={12}>
                            <Button  variant='contained' form='name-form' type='submit' color='primary'>
                                Confirmar
                            </Button>
                        </Grid>
					</form>

				</Container>
			</Styles>
		</React.Fragment>
	);
};

export default RegisterBook;
