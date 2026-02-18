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
    async updateById(id,user) {
        return await userRepository.updateById(id,user);//pass data, get new user
    }
    async deleteById(id) {
        return await userRepository.deleteById(id);//pass data
    }
}
const userService = new UserService();
module.exports = {
    userService
};