const fs = require('node:fs/promises');
const path = require('node:path');

const filePath = path.join(process.cwd(), 'db', 'users.json');

const read = async () => {
    try {
        const json = await fs.readFile(filePath, "utf-8");//read everything from file in FPath, encode it
        return json ? JSON.parse(json) : [];//if it is something in there, parse it and return, if not, rt []
    } catch (e) {
        console.log('Error', e); // catch error if it is
    }
}

const write = async (users) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(users, null, 2));//write info you get from users arg into file
        // from FPath
    } catch (e) {
        console.log('Error', e.message)
    }
}

module.exports = {
    read,
    write
}