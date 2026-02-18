
1. Make sourceFilePath (where from to take information) path
2. Make targetFilePath (where to put info) path
3. make fs.createReadStream (args: where from take it, encode it) fs
4. make create interface (everything above put inside input rl


try:
make directory for all emails
1. iterate using for of to get each line from rl
2. take only from email using split.at (delete hash)
3. split email '@' (split login and domain name)
4. if split email length not 2, continue
5. extract only domain name as string from slitEmail
6. (1 task) do verification if domain is gmail.com await afs and append target file path, add full email into there
7. add .txt to domain name
8. append emails to the directory above with naming

finally:
await rl.close