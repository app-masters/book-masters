import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import moment from 'moment';
import LoadingSpinner from '../components/LoadingSpinner';
import { Typography } from '@material-ui/core';
import { statusBook, statusTranslate } from '../utils/constraints';

const useStyles = makeStyles({
  container: {
    flex: 1,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  table: {
    maxWidth: 1200,
    display: 'table',
  },
  row: {
    cursor: 'pointer',
  },
});

const Reserves = () => {
  const classes = useStyles();
  const history = useHistory();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/usersBooks`);
        if (response.status === 200) {
          setRows(response.data);
          console.log(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.log('Error listing: ', error);
        setLoading(false);
      }
    };
    setLoading(true);
    getData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={classes.container}>
      <Typography style={{ paddingBottom: 16 }} variant="h4">
        Minhas Reservas
      </Typography>
      <TableContainer className={classes.table} component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <strong>Livro</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Estado</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Prazo</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                hover
                className={classes.row}
                key={row._id}
                onClick={() => history.push(`/book/${row.idBook._id}`)}
              >
                <TableCell align="left">{row.idBook.title}</TableCell>
                <TableCell align="left">{statusTranslate[row.status]}</TableCell>
                <TableCell align="left">
                  {row.status === statusBook.reserved
                    ? moment(row.reservationEndAt).format('DD/MM/YYYY')
                    : moment(row.lendingEndAt).format('DD/MM/YYYY')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Reserves;
