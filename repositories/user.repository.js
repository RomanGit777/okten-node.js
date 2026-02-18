const {read, write} = require("../services/fs.services");

class UserRepository {
    async getAll() {
        return read();//return either parsed data or []
    }

    async create(user) {
        const users = await read(); //read file to get actual info about all users
        const newUser = {//building new user
            id: users.length ? users[users.length - 1].id + 1 : 1,
            name: user.name,
            surname: user.surname,
            age: user.age
        }
        users.push(newUser);//we push newUser into users array we get after read worked
        await write(users);//update database state with new user
        return newUser;
    }
    async getById(id) {
        const users = await read();//read file to get all users
        const index = users.findIndex(user => user.id === Number(id));//compare clients id and id from db
        return users[index];//return founded user
    }
}

const userRepository = new UserRepository();

module.exports = {
    userRepository
};