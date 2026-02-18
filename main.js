const express = require('express');
const {userService} = require("./services/user.service");
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/users', async (req,res) => {
    const data = await userService.getAll();//get array from db
    res.json(data);// response to the client
})

app.get('/users/:id', async (req,res) => {
    const id = req.params.id;//get the id
    const data = await userService.getById(id);//pass id to, await, get the result
    res.json(data);// response to the client
})

app.post('/users', async (req, res) => {
    const user = req.body; //take the user that client build and send
    const data = await userService.create(user);//give user to the service>repository>services, await, get created user.
    res.json(data);// response to the client
})

app.put('/users/:id', async (req, res) => {
    const user = req.body;//take user
    const id = req.params.id;//take id
    const data = await userService.updateById(id, user);//pass data, await data back
    res.json(data);//response with new data
})

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;//take id
    await userService.deleteById(id);//pass id
    res.end();//res end
})

app.listen(5000, ()=>{
    console.log('server running on 5000 port');
})