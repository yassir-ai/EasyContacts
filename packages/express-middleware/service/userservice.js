const User = require('../model/user')



class UserService {
    async getAllUsers() {
      try {
        const users = await User.findAll();
        return users;
      } catch (error) {
        throw new Error('Erreur lors de la récupération des utilisateurs.');
      }
    }
}
  
module.exports = new UserService();