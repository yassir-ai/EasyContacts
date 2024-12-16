import React from 'react';
import './Navbar.css'
import { expiredTokenHandler } from './index.js'
import ContactForm from './ContactForm';
import { useNavigate } from 'react-router-dom';

function Navbar()
{
    const navigate = useNavigate();
    return(
        <ul>
            <li><a href="/contact/">Home</a></li>
            <li><a className='add-button' onClick={() => navigate('/contact/edit', {state : {contact:  {uuid: '', about: '', type: ''} }}) }>Add</a></li>
            <li ><button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={expiredTokenHandler}>Deconnexion</button></li>
        </ul>
    );
}


export default Navbar;