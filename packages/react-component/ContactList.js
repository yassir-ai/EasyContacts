// import { Switch, Route } from "react-router-dom";
import { useState, useEffect, useReducer } from "react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Contact.css'
import ContactCard from "./ContactCard.js";
import Navbar from './navbar.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { expiredTokenHandler } from './index.js'





import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridToolbar,
    GridColumnMenu,
  } from '@mui/x-data-grid';




  function CustomColumnMenu(props) {
    return (
      <GridColumnMenu
        {...props}
        slots={{
          // Hide `columnMenuColumnsItem`
          columnMenuColumnsItem: null,
        }}
      />
    );
  }


function ContactList({contacts, dispatch}) {

    const navigate = useNavigate();  

    const deleteContact = async (contactUuid) => {

        const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce contact ?");
        const token = localStorage.getItem('jwt');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    
        if (isConfirmed)  
        {
            try
            {
                await axios.delete(`/api/contact/${contactUuid}`, config);
                toast.success('Contact has been deleted successfully 👌');
                dispatch({type: 'delete_contact', uuid_contact: contactUuid}); //action en parametre
            }
            catch(error)
            {
                if (error.response.status == 401)
                {
                    expiredTokenHandler();
                }
    
                toast.error('Operation has failed! 😫');
            }
        }
    }

    const columns = [
        {
          field: 'name',
          headerName: 'Name',
          width: 250,
          editable: false,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'center',
        },
        {
          field: 'type',
          headerName: 'Type',
          width: 250,
          editable: false,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'center',
        },
        {
          field: 'about',
          headerName: 'About ',
          width: 250,
          editable: false,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'center',
        },
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Actions',
          headerClassName: 'super-app-theme--header',
          headerAlign: 'center',
          width: 250,
          cellClassName: 'actions',
          getActions: ({ row }) => {
              return [
                  <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={() => { navigate('/contact/edit', {state : {contact:  row}}) }}
                    color="inherit"
                  />,
                  <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => { deleteContact(row.uuid) }}
                    color="inherit"
                  />,
                ];
              }
          },
      ];


    return (
        <div style={{ background: 'radial-gradient(#aa12a8, #bf5407)', minHeight: '100vh' }}>
            <div>
                <Navbar/>
            </div>

            <div className='contact'>

                <div className="row">
                    <div className="col-sm">
                        <h1>Welcome to contact manager</h1>
                        <h2>Our website helps you manage your contacts.</h2>
                        <img src="https://images.pexels.com/photos/821754/pexels-photo-821754.jpeg" className="img-fluid img-thumbnail"/>
                    </div>
                    <div className="col-sm">
                        <Box sx={{ height: 600, width: 1000, boxShadow: 50,

                            borderColor: 'primary.light',
                            '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main', },
                            '& .super-app-theme--header': {
                            backgroundColor: 'rgba(97, 60, 183, 0.75)',},
                            backgroundColor: 'white'
                            }}>
                            <DataGrid

                                rows={contacts}
                                getRowId={(contact) => {return contact.uuid}}
                                columns={columns}
                                slots={{ columnMenu: CustomColumnMenu }}
                                initialState={{
                                pagination: {
                                paginationModel: {
                                pageSize: 4,
                                },
                                },}}
                                pageSizeOptions={[4, 6, 8]}
                                disableRowSelectionOnClick
                                slotProps={{
                                columnMenu: {
                                sx: {
                                /* style allied to the column menu */
                                backgroundColor: "white" // for example
                                }
                                },
                                }}
                            />
                        </Box>
                    </div>
                </div>



                {/* <div className="row">
                    <button class="buttonAdd" onClick={() => navigate('/contact/edit', {state : {contact:  {uuid: '', about: '', type: ''} }}) }>Ajouter contact</button>
                </div> */}

                {/* <div className="container">
                    {contacts.map(Contact => ( <ContactCard key={Contact.uuid} contact={Contact} onDelete={deleteContact}/> ))}
                </div> */}

            
            


            </div>

        </div>

    )
};

export default ContactList;