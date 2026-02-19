const express = require('express');
const {userService} = require("./services/user.service");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', async (req, res) => {
    const data = await userService.getAll();
    res.json(data);
})

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const data = await userService.getById(id);
    res.json(data);
})

app.post('/users', async (req, res) => {
    const user = req.body;
    const data = await userService.create(user);
    res.json(data);
})

app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    const data = await userService.updateById(id, user);
    res.json(data);
})

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    await userService.deleteById(id);
    res.end();
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
});