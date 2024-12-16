// import { Switch, Route } from "react-router-dom";
import React from "react"
import { useEffect, useReducer } from "react"
import axios from 'axios';
import './Contact.css'
import ContactForm from "./ContactForm.js";
import reducer from './reducer/contact_reducer.js';
import ContactList from './ContactList.js';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// Ce fichier permet de mettre en place le routing react
// de vos différents composant react

export const expiredTokenHandler = () =>
{
    localStorage.removeItem('jwt');
    window.location = '/';
}


function Contact() {

    const [contacts, dispatch] = useReducer(reducer, []);

    const fetchContacts = async () => {

        const token = localStorage.getItem('jwt');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        
        try
        {
            const response = await axios.get('/api/contact', config);
            dispatch({type: 'init_contacts', nextContacts: response.data});


        }
        catch(error)
        {
            if (error.response.status == 401)
            {
                expiredTokenHandler();
            }
        }
    }
    

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <>
        <Routes>
            <Route path={`/`} element={<ContactList contacts={contacts} dispatch={dispatch}/>} />
            <Route path="/edit" element={<ContactForm dispatch={dispatch}/>} />
        </Routes>
        <ToastContainer />
        </>
        
    )
};

export default Contact;