import React, {useState} from 'react'
import ContactList from './ContactList.js';
import './Contact.css'
import ContactCard from './ContactCard.js';

const SearchBar = ({contacts, dispatch}) => {
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };
      
    if (searchInput.length > 0) {
        contacts.filter((contact) => {
        return contact.name.match(searchInput);
    });
    }

    return (
        <div>
            <div>
                <input
                type="search"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput} />
            </div>
            <div className="container">
                    {contacts.map(Contact => ( <ContactCard key={Contact.uuid} contact={Contact} /> ))}
            </div>
        </div>
    )
}

export default SearchBar;