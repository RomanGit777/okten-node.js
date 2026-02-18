const express = require('express');
const {userService} = require("./services/user.service");
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//
// app.get('/users/:name', (req, res)=>{
//     console.log(req.params.name);
//     console.log(req.query);
//     res.end('Hello from get')
// })
//
// app.post('/users', (req, res)=>{
//     console.log(req.body);
//     res.end('Hello from post')
// })
//
// app.put('/users', (req, res)=>{
//     res.end('Hello from put')
// })
//
// app.patch('/users', (req, res)=>{
//     res.end('Hello from patch')
// })
//
// app.delete('/users', (req, res)=>{
//     res.end('Hello from delete')
// })

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

app.listen(5000, ()=>{
    console.log('server running on 5000 port');
})