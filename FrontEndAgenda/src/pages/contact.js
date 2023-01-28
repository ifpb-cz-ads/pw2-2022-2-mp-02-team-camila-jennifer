import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import {useContext, useEffect, useState} from "react";
import GlobalContext from "../Context/globalContexto";
import {Link, Navigate} from "react-router-dom";
import api from "../service/api";

const columns = [
  { field: 'id', headerName: 'ID', width: 110 },
  {
    field: 'name',
    headerName: 'Nome',
    width: 170,
    editable: true,
  },
  {
    field: 'phone',
    headerName: 'Telefone',
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

const Contact =() => {
    const [user, setUser] = useContext(GlobalContext);

  const [contact, setContact] = useState([])
  const [rows, setRows] = useState([])
  const contactUser = async (id) => {
      console.log(id)
    const result = await api.get(`contato/list/${id}`)
        .then((resposta) => resposta.data)
        .then((json) => {
            console.log(json.contatos)
            setContact(json.contatos)
        })
        .catch((error) => console.error(error))
    };


  const contactROws = () => {
    let row = [];
    console.log("contact")
    console.log(contact)
   contact.map(i =>  row.push({
        id: i.id,
        name: i.nome,
        phone: i.telefone
    }));
    console.log("row")
    console.log(row)
    setRows(row)

}

  useEffect(() => {
      console.log("user")
      console.log(user)
      // contactUser(13)

      if(user) {
          console.log("id")
          console.log(user.id)
          contactUser(user.id)
      }
  }, [])

    useEffect(() => {
        console.log("contact us")
        console.log(contact)
        if(contact.length > 0){
            contactROws()
        }
    }, [contact])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

      <div style={{ display: 'flex', flexDirection: 'row',  justifyContent: 'flex-end', width:'90%'}}>
          <p> Editar Dados</p>
          <Link to="/   " >
            <p style={{ marginLeft: 40 }}> Sair</p>
          </Link>
      </div>

      <h1 style={{ marginTop: 18 }}> Contatos </h1>
      <div style={{ width: '54%', display:'flex', justifyContent:'flex-start' }}>
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

export default  Contact;
;
