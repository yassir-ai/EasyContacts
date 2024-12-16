const contactService = require('../service/contactservice');
const mapContactToDTO = require('../helper/mapper');

class ContactController {
  async getAllContacts(req, res) {
    try {
      const userId = req.user.sub;
      const contacts = await contactService.getContactsByUserId(userId);
      const contactsDTO = contacts.map(contact => mapContactToDTO(contact));

      return res.status(200).json(contactsDTO); //renvoyer ok avec un json avec la bonne reponse
    } 
    catch (error) {
      console.error('Error in controller: ', error);
       return res.status(500).json({ error: error.message });
    }
  }


  async getOneContact(res, contactUuid)
  {
    try
    {
      const contact = await contactService.getContactByUuuid(contactUuid);
      const contactDto = mapContactToDTO(contact);

      if(contact == null || contact.length == 0) return res.status(404).json("contact not found");
      else return res.status(200).json(contactDto);
    }
    catch(error)
    {
      console.error('Error in controller: ', error);
      return res.status(500).json({ error: error.message });
    }
  }

  async createContact(res, req)
  {
    try
    {
      const contactCreate = req.body;
      const user = req.user.sub;
      const [contactCreated, created] = await contactService.createContact(contactCreate, user);
      const contactCreatedDto = mapContactToDTO(contactCreated);

      if(!created) return res.status(422).json("contact payload is invalid");
      else return res.status(201).json(contactCreatedDto);
    }
    catch(error)
    {
      console.error('Error in controller: ', error);
      return res.status(500).json({ error: error.message });
    }
  }

  async updateContact(res, req)
  {
    try
    {
      const contactToUpdate = req.body;
      const contactuuid = req.params.contactuuid;
      const [contact, updatedContact] = await contactService.updateContact(contactToUpdate, contactuuid);
      const contactDto = mapContactToDTO(contact);

      if(!updatedContact) res.status(422).json("input is not valid");
      else res.status(201).json(contactDto);
    }
    catch(error)
    {
      console.error('Error in controller: ', error);
      res.status(500).json({ error: error.message });
    }
  }

  async deleteContact(res, contactuuid)
  {
    try
    {
      const contactToDelete = await contactService.getContactByUuuid(contactuuid);

      if(contactToDelete == null) return res.status(404).json("contact not found");
      
      const updatedContact = await contactService.deleteContact(contactuuid);

      if(!updatedContact) return res.status(422).json("input is not valid");
      else return res.status(204).json("contact deleted");
    }
    catch(error)
    {
      console.error('Error in controller: ', error);
      return res.status(500).json({ error: error.message });
    }
  }
}
  

module.exports = new ContactController();