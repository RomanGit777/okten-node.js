const {userRepository} = require('../repositories/user.repository');
class UserService {
    async getAll(){
        return await userRepository.getAll();//get result of read in services
    }
    async create(user) {
        return await userRepository.create(user);//get created user
    }
    async getById(id){
        return await userRepository.getById(id);//get founded user
    }
}
const userService = new UserService();//why do we need to do add "new" here and in repository?
module.exports = {
    userService
};