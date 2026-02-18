// https://github.com/OktenSchool/nodejs/blob/lesson1-hw/emails.txt
//     Є ось такий файл... ваша задача записати в новий файл тільки email'ли з доменом gmail.com (Хеш то що з ліва записувати не потрібно)
// Кому мало ДЗ можете його виконати трохи в іншому форматі:
//     до прикладу:
//     якщо імайли закінчуються на gmail.com то всі записи записуємо в gmail.com.txt
// якщо імайли закінчуються на ukr.net то всі записи записуємо в ukr.net.txt
// і так далі

const afs = require('node:fs/promises');
const fs = require('node:fs');
const path = require('node:path');
const readLine = require('node:readline/promises');

const start = async () => {
    const sourceFilePath = path.join(process.cwd(), 'emails.txt');
    // const targetFilePath = path.join(process.cwd(), 'gmails.txt');
    const fileStream = fs.createReadStream(sourceFilePath, { encoding: 'utf8' });
    const rl = readLine.createInterface({input: fileStream});

    try {
        await afs.mkdir('emails', { recursive: true });
        for await (const line of rl) {
            const email = line.split('\t').at(-1);
            const splitEmail = line.split('@');

            if ( splitEmail.length !== 2 ) continue;

            const domainName = splitEmail.at(-1);

            // if (domainName === 'gmail.com') {
            //     await afs.appendFile(targetFilePath, `${email}\n`)
            // }

            const targetFileName = domainName + '.txt';
            await afs.appendFile(`emails/${targetFileName}`, `${email}\n`)
        }

    } finally {
        await rl.close();
    }

}
start();