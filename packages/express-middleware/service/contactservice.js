const {v4: uuidv4} = require('uuid');

const Contact = require('../model/contact');

const TypeEnum = ['work', 'other', 'friend'];

class ContactService {
  async getContactsByUserId(userId) {
    try 
    {
      const contacts = await Contact.findAll({
        where: {
          user: userId
        }
      });

      return contacts;

    } 
    catch (error) {
      console.error('Erreur dans le service:', error);
      throw new Error('Erreur lors de la récupération des contacts.');
    }
  }

  async getContactByUuuid(uuidSearched) {
    try
    {
        const contact = await Contact.findOne({
          where: {
            uuid: uuidSearched
          }
        });

        return contact;
    }
    catch(error)
    {
      console.error('Erreur dans le service:', error);
      throw new Error('Erreur lors de la récupération des contacts.');
    }
  }

  async createContact(contact, uuidUser)
  {
    if(!contact.name || contact.name === '' || contact.name === null
     || !contact.about || contact.about === '' || contact.about === null
     || !TypeEnum.includes(contact.type) || contact.type === '' || contact.type === null)
    {
      return [null, false];
    }

    try
    {
      const [contactCreated, created] = await Contact.findOrCreate({
        where: {
          name: contact.name
        },
        defaults: {
          uuid: uuidv4(),
          name: contact.name,
          about: contact.about,
          type: contact.type,
          user: uuidUser
        }
      });

      return [contactCreated, created];
    }
    catch(error)
    {
      console.error('Erreur dans le service:', error);
      throw new Error('Erreur lors de la création du contact.');
    }
  }


  async updateContact(contact, uuidContact)
  {
    var updatedContact = false;

    if(!contact.name || contact.name === '' || contact.name === null
     || !contact.about || contact.about === '' || contact.about === null
     || !TypeEnum.includes(contact.type) || contact.type === '' || contact.type === null)
    {
      return [null, updatedContact];
    }

    try
    {
      await Contact.update(contact, {
        where: {
          uuid: uuidContact,
        },
      });
      
      updatedContact = true;

      return [contact, updatedContact];
    }
    catch(error)
    {
      console.error('Erreur dans le service:', error);
      throw new Error('Erreur lors de la mise à jour du contact.');
    }
  }

  async deleteContact(uuidContact)
  {
    var deletedContact = false;

    try
    {
      await Contact.destroy({
        where: {
          uuid: uuidContact
        },
      });

      deletedContact = true;

      return deletedContact;
    }
    catch(error)
    {
      console.error('Erreur dans le service:', error);
      throw new Error('Erreur lors de la suppression du contact.');
    }
  }
}

module.exports = new ContactService();