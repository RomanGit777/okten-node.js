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

    async updateById(id, user) {
        const users = await read();//read db
        const index = users.findIndex(user => user.id === Number(id));//compare ids to find one client need
        user.id = Number(id)//keep his id the same
        users[index] = user//update existing array
        await write(users)//rewrite array with new info, send to db
        return user//return user to client
    }
    async deleteById(id) {
        const users = await read();//get array from db
        const index = users.findIndex(user => user.id === Number(id));//compare ids to get one client wanted
        users.splice(index, 1);//delete it from array
        await write(users);//rewrite new array
    }
}

const userRepository = new UserRepository();

module.exports = {
    userRepository
};