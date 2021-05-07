import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import moment from 'moment';
import { statusBook } from '../utils/constraints';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    maxWidth: 1200,
    display: 'table',
  },
  row: {
    cursor: 'pointer',
  },
});

export default function AllReservesTable(props) {
  const history = useHistory();
  const classes = useStyles();
  return (
    <>
      <Typography style={{ paddingBottom: 16, marginTop: 16 }} variant="h4">
        {props.title}
      </Typography>
      <TableContainer className={classes.table} component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <strong>Usuário</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Livro</strong>
              </TableCell>
              {props.rows[0]?.status !== statusBook.returned && (
                <TableCell align="left">
                  <strong>Data início</strong>
                </TableCell>
              )}
              <TableCell align="left">
                <strong>
                  {props.rows[0]?.status === statusBook.returned
                    ? 'Data'
                    : 'Prazo'}
                </strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow
                hover
                className={classes.row}
                key={row._id}
                onClick={() => history.push(`/book/${row.idBook._id}`)}
              >
                <TableCell align="left">
                  <a
                    href={`https://programador.emjuizdefora.com/dev/${row.idUser.slug}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {row.idUser.name}
                  </a>
                </TableCell>
                <TableCell align="left">{row.idBook.title}</TableCell>
                {row.status !== statusBook.returned && (
                  <TableCell align="left">
                    {row.status === statusBook.reserved
                      ? moment(row.reservationStartedAt).format('DD/MM/YYYY')
                      : row.status === statusBook.borrowed &&
                        moment(row.lendingStartedAt).format('DD/MM/YYYY')}
                  </TableCell>
                )}
                <TableCell align="left">
                  {row.status === statusBook.reserved
                    ? moment(row.reservationEndAt).format('DD/MM/YYYY')
                    : row.status === statusBook.borrowed
                    ? moment(row.lendingEndAt).format('DD/MM/YYYY')
                    : moment(row.returnedAt).format('DD/MM/YYYY')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
