// https://github.com/OktenSchool/nodejs/blob/lesson1-hw/emails.txt
//     Є ось такий файл... ваша задача записати в новий файл тільки email'ли з доменом gmail.com (Хеш то що з ліва записувати не потрібно)
// Кому мало ДЗ можете його виконати трохи в іншому форматі:
//     до прикладу:
//     якщо імайли закінчуються на gmail.com то всі записи записуємо в gmail.com.txt
// якщо імайли закінчуються на ukr.net то всі записи записуємо в ukr.net.txt
// і так далі

const path = require('node:path'); // path to build correct path for files,directories
const fs = require('node:fs'); //fs to create and append files, directories
const afs = require('node:fs/promises');// async fs to not blocking i/o, write safer code
const readLine = require('node:readline/promises');// rl to read the code

const start = async () => {
    const sourceFilePath = path.join(process.cwd(), 'emails.txt');//source
    // const targetFilePath = path.join(process.cwd(), 'gmail.txt');//target 1task
    const fileStream = fs.createReadStream(sourceFilePath, 'utf8');//read from
    const rl = readLine.createInterface({input: fileStream});//read by line

    try {
        await afs.mkdir(`emails`, {recursive: true}); //creating directory for them
        for await (const line of rl) {
            const email = line.split('\t').at(-1);// no more hash in this variable
            const splitEmail = email.split('@'); //split login and domain

            if (splitEmail.length !== 2) continue;

            const domainName = splitEmail.at(-1); // take domain name

            // if (domainName === 'gmail.com') { // 1 task
            //     await afs.appendFile(targetFilePath, `${email}\n`)
            // }

            const targetFileName = domainName + '.txt'; // making a name for creating a file for each email
            await afs.appendFile(`emails/${targetFileName}`, `${email}\n`);//append files + data
        }

    } finally {
        await rl.close();
    }

}
start();