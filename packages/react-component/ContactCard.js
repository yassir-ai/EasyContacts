import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';



function ContactCard({ contact, onDelete }) {

    const navigate = useNavigate()

    return(

        <div className="card" style={{ width: '20rem' }}>
            <div className="card-body">
                <h5 className="card-title">{contact.name}</h5>
                <p className="card-text"><strong>About:</strong> {contact.about}</p>
                <p className="card-text"><strong>Type:</strong> {contact.type}</p>
            </div>
            <div className="card-footer d-flex justify-content-between">

                <button className="btn btn-primary" onClick={() => navigate('/contact/edit', {state : {contact:  contact}}) }>Edit</button>

                <button className="btn btn-danger" onClick={() => onDelete(contact.uuid)}>Delete</button>
            </div>
        </div>
    ); 
}


export default ContactCard; 