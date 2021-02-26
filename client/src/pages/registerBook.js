import React, { useCallback, useState } from 'react';
import {
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import { SearchRounded } from '@material-ui/icons';
import SaveIcon from '@material-ui/icons/Save';
import fetchBookGoogle from '../services/googleBooksAPI';
import api from '../services/api';
import { useHistory } from 'react-router-dom';
import { register } from '../assets/css/makeStyles';
import ChipInput from 'material-ui-chip-input';
import { useAuth } from '../lib/auth';
import { Alert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';

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
  const { auth } = useAuth();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [values, setValues] = useState({
    isbn: '',
    title: '',
    description: '',
    author: '',
    publishingCompany: '',
    tags: [],
    imageUrl: '',
    publicationYear: '',
    edition: '',
  });

  const onChangeValue = ({ target }) => {
    setValues({ ...values, [target.name]: target.value });
  };

  const [ISBNError, setISBNError] = useState(null);

  const handleSubmitRegister = useCallback(
    async (e) => {
      setLoading(true);
      setError(null);
      e.preventDefault();
      try {
        const data = {
          idUser: auth?.id || 1,
          ...values,
        };
        await api.post('/books', data);
        setLoading(false);
        setOpen(true);
        history.push('/');
      } catch (error) {
        setLoading(false);
        setError('Ocorreu um erro ao salvar o livro.');
        console.log('Error saving book', error.message);
      }
    },
    [values, history, auth]
  );

  const searchGoogleAPI = useCallback(
    async (e) => {
      try {
        setISBNError(false);
        if (!values.isbn || values.isbn === '') {
          setISBNError('Preencha o campo');
          return;
        }
        const response = await fetchBookGoogle(values.isbn);
        if (response) {
          if (Object.keys(response).length === 0) {
            setISBNError('Livro não encontrado');
            return;
          }
          setISBNError(false);
          setValues({ ...values, ...response });
        } else {
          setISBNError('Ocorreu um erro');
        }
      } catch (e) {
        console.log('Error fetching books', e.message);
      }
    },
    [values]
  );

  const handleAddChip = (chip) => {
    const tags = [...values.tags, chip];
    setValues({ ...values, tags });
  };

  const handleDeleteChip = (chip) => {
    const tags = values.tags.filter((f) => f !== chip);
    setValues({ ...values, tags });
  };

  return (
    <Container className={classes.container} maxWidth="md">
      <Typography variant="h3" className={classes.title}>
        Registrar Novo Livro
      </Typography>
      <form
        onSubmit={handleSubmitRegister}
        id="book-form"
        style={{ paddingTop: 32 }}
      >
        <Grid
          container
          spacing={2}
          style={{ maxWidth: '100%', margin: 0, padding: 0 }}
        >
          <Grid container item md={11} xs={10}>
            <TextField
              name="isbn"
              label="ISBN"
              style={{ margin: 8 }}
              placeholder="ISBN"
              error={!!ISBNError}
              helperText={ISBNError}
              fullWidth
              value={values.isbn}
              onChange={onChangeValue}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            xs={2}
            md={1}
            justify="center"
            alignItems="flex-start"
            container
            style={{ paddingTop: 16 }}
          >
            <IconButton onClick={searchGoogleAPI} aria-label="search">
              <SearchRounded fontSize="large" />
            </IconButton>
          </Grid>
          <Grid container item xs={12}>
            <TextField
              name="title"
              label="Título"
              required
              style={{ margin: 8 }}
              placeholder="Título"
              fullWidth
              value={values.title}
              onChange={onChangeValue}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid container item xs={12}>
            <TextField
              name="author"
              required
              label="Autor"
              style={{ margin: 8 }}
              placeholder="Autor"
              fullWidth
              value={values.author}
              onChange={onChangeValue}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid container item xs={12}>
            <TextField
              name="description"
              label="Descrição"
              style={{ margin: 8 }}
              placeholder="Descrição"
              fullWidth
              multiline
              value={values.description}
              onChange={onChangeValue}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid container item xs={12}>
            <TextField
              name="publishingCompany"
              label="Editora"
              required
              style={{ margin: 8 }}
              placeholder="Editora"
              fullWidth
              value={values.publishingCompany}
              onChange={onChangeValue}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid container item xs={12}>
            <ChipInput
              name="tags"
              label="Tags"
              style={{ margin: 8 }}
              placeholder="Tags"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              helperText="Informe as tags separadas por vírgula."
              variant="outlined"
              newChipKeyCodes={[188, 9]}
              value={values.tags}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip, index) => handleDeleteChip(chip)}
            />
          </Grid>
          <Grid container item xs={12}>
            <TextField
              name="imageUrl"
              label="Capa"
              helperText="Informe a URL para a imagem da capa."
              style={{ margin: 8 }}
              placeholder="Capa"
              fullWidth
              value={values.imageUrl}
              onChange={onChangeValue}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid container item xs={12}>
            <TextField
              name="publicationYear"
              label="Ano de publicação"
              style={{ margin: 8 }}
              placeholder="Ano de publicação"
              fullWidth
              type="number"
              value={values.publicationYear}
              onChange={onChangeValue}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid container item xs={12}>
            <TextField
              name="edition"
              label="Edição"
              type="number"
              style={{ margin: 8 }}
              placeholder="Edição"
              fullWidth
              value={values.edition}
              onChange={onChangeValue}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>

          <Grid
            container
            justify="flex-end"
            item
            xs={12}
            style={{ paddingRight: 16 }}
          >
            {error && <Alert severity="error">{error}</Alert>}
          </Grid>

          <Grid
            container
            justify="flex-end"
            style={{ paddingTop: 16, paddingBottom: 50, paddingRight: 16 }}
            item
            xs={12}
          >
            <Button
              className={classes.buttonOutlined}
              variant="outlined"
              size="large"
              disabled={loading}
              startIcon={<SaveIcon />}
              form="book-form"
              type="submit"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Livro registrado com sucesso!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegisterBook;
