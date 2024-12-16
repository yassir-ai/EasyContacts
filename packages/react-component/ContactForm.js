import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css'
import Navbar from './navbar.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { expiredTokenHandler } from './index.js';


const ContactForm = ({dispatch}) => {

  const navigate = useNavigate();
  let location = useLocation();
  let current_object = location.state.contact;

  const [name, setName] = useState(current_object.name);
  const [about, setAbout] = useState(current_object.about);
  const [type, setType] = useState(current_object.type);




  const handleSubmit = async (event) => {
    
      event.preventDefault();

      let newObject = {name, about, type};
      let response = null;

      const token = localStorage.getItem('jwt');
      const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
      };

      try
      {
        if(current_object.uuid !== "")
        {
          response = await axios.put(`/api/contact/${current_object.uuid}`, newObject, config);
          dispatch({type: 'edit_contact',  payload: {contactUuid: current_object.uuid, newData: newObject}});
          toast.success('Contact has been updated successfully 👌');
        }
        else 
        {
          response = await axios.post(`/api/contact`, newObject, config);
          dispatch({type: 'add_contact',  newObject: response.data});
          toast.success('Contact has been created successfully 👌');
        }

        navigate('/contact');
      }
      catch (error)
      {
        if (error.response.status == 401)
        {
          expiredTokenHandler();
        }

        toast.error('Operation has failed! 😫');
      }
    }

    return (
      <div>
      <div>
        <Navbar/>
      </div>
      <form onSubmit={handleSubmit} className="nadi">
        <div >
          <div className="form-group">
            <label htmlFor="inputEmail4">Name</label>
            <input type="text" className="form-control" placeholder="Name" defaultValue={current_object.name} onChange={(e) => setName(e.target.value)}></input>
          </div>
        </div>
        
        <div className="form-row">
          <div >
            <label >About</label>
            <textarea type="text" className="form-control" rows="3" placeholder="About" defaultValue={current_object.about} onChange={(e) => setAbout(e.target.value)}></textarea>
          </div>
          <div >
            <label htmlFor="inputState">State</label>
            <select id="inputState" className="form-control " defaultValue={current_object.type} onChange={(e) => setType(e.target.value)}>
              <option value="" disabled>Choose...</option>
              <option value="work">Work</option>
              <option value="friend">Friend</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" >Save</button>
      </form>
      </div>
    )
}

export default ContactForm;