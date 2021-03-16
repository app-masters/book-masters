import React, { useEffect, useState } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import AllReservesTable from '../components/AllReservesTable';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

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

const AllReserves = () => {
  const classes = useStyles();
  const [rows, setRows] = useState({
    reserved: [],
    borrowed: [],
    returned: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/lendings`);
        console.log(response);
        if (response.status === 200) {
          setRows({
            reserved: response.data.filter((obj) => obj.status === 'reserved'),
            returned: response.data.filter((obj) => obj.status === 'returned'),
            borrowed: response.data.filter((obj) => obj.status === 'borrowed'),
          });
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
      <AllReservesTable
        title="Reservados"
        rows={rows.reserved.sort((a, b) =>
          moment(a.reservationEndAt).isAfter(b.reservationEndAt) ? 1 : -1
        )}
      />
      <AllReservesTable
        title="Emprestados"
        rows={rows.borrowed.sort((a, b) =>
          moment(a.lendingEndAt).isAfter(b.lendingEndAt) ? 1 : -1
        )}
      />
      <AllReservesTable
        title="Devolvidos"
        rows={rows.returned.sort((a, b) =>
          moment(a.returnedAt).isAfter(b.returnedAt) ? 1 : -1
        )}
      />
    </div>
  );
};

export default AllReserves;
