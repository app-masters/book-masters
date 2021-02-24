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
import { Redirect } from 'react-router-dom';
import api from '../services/api';
import { register } from '../assets/css/makeStyles';
import ChipInput from 'material-ui-chip-input';

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

  const [ISBN, setISBN] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [authors, setAuthors] = useState('');
  const [editor, setEditor] = useState('');
  const [tags, setTags] = useState([]);
  const [coverURL, setCoverURL] = useState('');
  const [year, setYear] = useState('');
  const [edition, setEdition] = useState('');

  const [ISBNError, setISBNError] = useState(false);

  const [redirect, setRedirect] = useState(false);

  async function enviar(obj) {
    try {
      await api.post('/books', obj);
    } catch (e) {
      throw e;
    }
  }

  const handleSubmitRegister = useCallback(
    (e) => {
      e.preventDefault();
      const serverBook = {
        isbn: ISBN,
        title,
        description,
        autor: authors,
        editora: editor,
        tag: tags,
        img: coverURL ? coverURL : process.env.NO_COVER_IMAGE,
        anoPublicacao: year,
        edicao: edition,
        status: 'Disponível',
      };
      try {
        enviar(serverBook);
        setRedirect(true);
      } catch (error) {
        console.log('Error saving book', error.message);
      }
    },
    [ISBN, title, description, authors, editor, tags, coverURL, year, edition]
  );

  const searchGoogleAPI = useCallback(async () => {
    try {
      const bookRes = await fetchBookGoogle(ISBN);
      if (bookRes) {
        setISBNError(false);
        setTitle(bookRes.title);
        setDescription(bookRes.description);
        setAuthors(bookRes.authors);
        setEditor(bookRes.editor);
        setCoverURL(bookRes.coverURL);
        setTags(bookRes.tags);
        setYear(bookRes.year);
      } else {
        setISBNError(true);
      }
    } catch (e) {
      console.log('Error fetching books', e.message);
      setISBNError(true);
    }
  }, [ISBN]);

  const handleAddChip = (chip) => {
    const newTags = [...tags, chip];
    setTags(newTags);
  };

  const handleDeleteChip = (chip, index) => {
    const removedTags = [...tags];
    removedTags.splice(index, 1);
    setTags(removedTags);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <Container className={classes.container} maxWidth="md">
      <Typography variant="h3" className={classes.title}>
        Registrar Novo Livro
      </Typography>

      <form
        id="book-form"
        onSubmit={(e) => handleSubmitRegister(e)}
        autoComplete="off"
        style={{ paddingTop: 40 }}
      >
        <Grid justify="center" alignItems="center" container spacing={3}>
          <Grid item xs={11}>
            <TextField
              id="form-isbn"
              label="ISBN"
              style={{ margin: 8 }}
              placeholder="ISBN"
              error={ISBNError}
              fullWidth
              value={ISBN}
              onChange={(val) => setISBN(val.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={1} justify="flex-end" container>
            <IconButton onClick={() => searchGoogleAPI()} aria-label="search">
              <SearchRounded fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="form-title"
              label="Título"
              required
              style={{ margin: 8 }}
              placeholder="Título"
              fullWidth
              value={title}
              onChange={(val) => setTitle(val.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="form-author"
              required
              label="Autor"
              style={{ margin: 8 }}
              placeholder="Autor"
              fullWidth
              value={authors}
              onChange={(val) => setAuthors(val.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="form-description"
              label="Descrição"
              style={{ margin: 8 }}
              placeholder="Descrição"
              fullWidth
              multiline
              value={description}
              onChange={(val) => setDescription(val.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="form-editor"
              label="Editora"
              required
              style={{ margin: 8 }}
              placeholder="Editora"
              fullWidth
              value={editor}
              onChange={(val) => setEditor(val.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <ChipInput
              id="form-tags"
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
              value={tags}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip, index) => handleDeleteChip(chip, index)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="form-cover"
              label="Capa"
              helperText="Informe a URL para a imagem da capa."
              style={{ margin: 8 }}
              placeholder="Capa"
              fullWidth
              value={coverURL}
              onChange={(val) => setCoverURL(val.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="form-year"
              label="Ano de publicação"
              style={{ margin: 8 }}
              placeholder="Ano de publicação"
              fullWidth
              type="number"
              value={year}
              onChange={(val) => setYear(val.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="form-edition"
              label="Edição"
              type="number"
              style={{ margin: 8, marginRight: 0 }}
              placeholder="Edição"
              fullWidth
              value={edition}
              onChange={(val) => setEdition(val.target.value)}
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
            style={{ paddingTop: 40, paddingBottom: 50 }}
          >
            <Button
              className={classes.buttonOutlined}
              variant="outlined"
              size="large"
              startIcon={<SaveIcon />}
              form="book-form"
              type="submit"
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
