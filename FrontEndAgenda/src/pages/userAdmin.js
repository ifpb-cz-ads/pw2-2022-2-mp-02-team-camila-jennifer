import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 110 },
  {
    field: 'name',
    headerName: 'Nome',
    width: 170,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 170,
    editable: true,
  },
  {
    field: 'action',
    headerName: 'Ação',
    width: 220,
    renderCell: () => (
      <strong>
        <Button
          variant="contained"
          size="small"
          style={{ marginLeft: 16, background: '#E56B6F', border: '1px solid #BC5457' }}

        >
          Editar
        </Button>
        <Button
          variant="contained"
          size="small"
          style={{ marginLeft: 16, background: '#E56B6F', border: '1px solid #BC5457' }}

        >
          Deletar
        </Button>
      </strong>

    ),
  },

];

const rows = [
  { id: 1, name: 'Snow', email: 'snow@gamil.com' },
  { id: 2, name: 'Snow', email: 'snow@gamil.com' },

];
const UserAdmin =() => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

      <div style={{ display: 'flex', flexDirection: 'row',  justifyContent: 'flex-end', width:'90%'}}>
          <p> Editar Dados</p>
          <p style={{ marginLeft: 40 }}> Sair</p>
      </div>

      <h1 style={{ marginTop: 18 }}> Usuário Admin </h1>

      <div style={{ width: '54%' }}>
        <Button
          variant="contained"
          size="small"
          style={{ background: '#E56B6F', border: '1px solid #BC5457', width: '10%' }}
        >
          Novo +
        </Button>
      </div>

      <Box sx={{ height: 400, width: '54%', marginTop: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
}

export default  UserAdmin;
