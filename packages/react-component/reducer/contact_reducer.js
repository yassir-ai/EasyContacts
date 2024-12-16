export function reducer(contacts, action)
{
    switch(action.type)  // faut pas modifier l'etat directement, toujours passer par des copies :) (...)
    {
        case 'init_contacts':
        {
            return  action.nextContacts;
        }
        case 'delete_contact':
        {
            return contacts.filter(contact => contact.uuid !== action.uuid_contact);
        }
        case 'edit_contact':
        {
            return contacts.map(contact => {
                
                if(contact.uuid === action.payload.contactUuid)
                {
                    return {...contact, ...action.payload.newData};
                }
                return contact;
            });
        }
        case 'add_contact':
        {
            return [...contacts, action.newObject];
        }    
        default:
            return contacts;
    }
}


export default reducer;