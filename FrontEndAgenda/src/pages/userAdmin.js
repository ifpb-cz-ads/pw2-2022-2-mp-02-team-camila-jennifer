import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../Context/globalContexto";
import { Link, Navigate } from "react-router-dom";
import api from "../service/api";
import { Edit } from "@mui/icons-material";


const UserAdmin = () => {

  const [user, setUser] = useContext(GlobalContext);
  const [informations, setInformations] = useState([]);
  const [rows, setRows] = useState([]);


  const userAdmin = async () => {
    await api.get(`users/listUsers`,{headers: {
      'Auth-Token': localStorage.getItem("token")
    }})
      .then((resposta) => resposta.data)
      .then((json) => {
        setInformations(json.User)
      })
      .catch((error) => console.error(error))
  };

  const handleDelete = async (id) => {
    await api.delete(`users/delUser/${id}`, {headers: {
        'Auth-Token': localStorage.getItem("token")
        }})
        .then((resposta) => resposta.data)
        .then((json) => {
            userAdmin(user.id)
        })
        .catch((error) => console.error(error))
  };

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
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Editar"
          style={{ color: "green" }}
        // onClick={ () => handleUpdate(params.id)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          style={{ color: "black" }}
          onClick={() => handleDelete(params.id)}
        />,
      ],
    },

  ];

  const usersRows = () => {
    let row = [];
    const result =  informations.filter(user => user.userAdmin == null)
    result.map(i => row.push({
      id: i.id,
      nome: i.username,
      email: i.email
    }));
    setRows(row)
  }

  useEffect(() => {
    userAdmin()
  }, [])

  useEffect(() => {
    if (Array.isArray(informations) && informations.length > 0 ) {
      usersRows()
    } else if (Array.isArray(informations) && informations.length < 1) {
      setRows([])
    }
  }, [informations])



  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '90%' }}>
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

export default UserAdmin;
