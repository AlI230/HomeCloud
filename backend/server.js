const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const con = require('./connect');
const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const fs = require('fs');
const multer = require('multer');
const AdmZip = require('adm-zip');

const app = express();
app.use(cors());

const port = process.env.PORT || 3030;

app.use(express.static('./upload'))
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('hello')
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    if(req.body.email != "" && req.body.password != "") {
        con.query('SELECT * FROM users WHERE email = ?', req.body.email, (err, result)=> {
            if(err) {
                console.log(err);
                return res.sendStatus(500);
            }
            if(bcrypt.compareSync(req.body.password, result[0].password_hash)) {
                return res.status(200).send({
                    email: email,
                    id: result[0].id
                })
            } else {
                return res.sendStatus(403);
            }
        });
    } else {
        return res.status(403).send("Not everything is filled in!")
    }
})

app.post('/register', (req, res) => {
    if(req.body.email != "" && req.body.password != "" && req.body.firstname != "" && req.body.lastname != "") {
        con.query('SELECT email FROM `users` WHERE email = ?', req.body.email, (err, result)=> {
            if(err) {
                console.log(err);
                return res.sendStatus(500);
            }
            if(result[0]){
                console.log(result);
                return res.sendStatus(403);
            } else {
                const generated_id = crypto.randomBytes(11).toString('hex');
                const password_hash = bcrypt.hashSync(req.body.password, 11);
                fs.mkdirSync('/' + generated_id + '/');
                const data = {
                    id: generated_id,
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    password_hash: password_hash,
                    folder_path: '/' + generated_id + '/'
                }
                con.query('INSERT INTO `users` SET ?', data, (err, result) => {
                    if(err) {
                        console.log(err);
                        return res.sendStatus(500)
                    }
                    return res.status(200).send({
                        email: data.email,
                        id: data.id,
                    })
                });
            }
            
        });
    } else {
        return res.status(403).send('')
    }
});

app.get('/folders/:id', (req, res)=> {
    con.query('SELECT * FROM `folders` WHERE user_id = ?', req.params.id, (err, result)=> {
        if (err) return res.status(500).send(err);
        res.status(200).send(result);
    })
});

app.post('/addfolder/:id', (req, res)=>{
    if(req.body.name != ""){
        const data = {
            name: req.body.name,
            main_path: '/' + req.params.id + '/',
            user_id: req.params.id
        }
        con.query('INSERT INTO `folders` SET ?', data, (err, result)=> {
            if (err) {
                res.status(500).send(err);
                console.log(err)
            } 
            fs.mkdirSync('./upload/' + req.params.id + '/' + req.body.name + '/')
            res.status(200).send({
                name: req.body.name,
            });
        })
    } else {
        res.sendStatus(400);
    }
});

app.get('/folders/folder/:folder_id', (req, res) => {
    con.query('SELECT * FROM `files` WHERE folder_id = ?', req.params.folder_id, (err, files) => {
        if (err) return res.status(500).send(err);
        if(files[0] === undefined) return res.send("no data");
        res.send(files);
    });
});

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './upload/' + req.params.user_id + '/' + req.params.foldername + '/')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
  })

let upload = multer({ storage: storage})

app.post('/addfiles/:user_id/:foldername', upload.array('file'), (req, res) => {
    con.query('SELECT folder_id FROM `folders` WHERE name = ? AND user_id = ?',[req.params.foldername, req.params.user_id], async (err, result)=>{
        if(err) return res.status(500).send(err);

        await req.files.forEach(function(file) {

            let is_image = 0;
    
            if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
                is_image = 1;
            }
    
            const data = {
                name: file.originalname,
                path: '/' + req.params.user_id + '/' + req.params.foldername + '/' + file.originalname,
                user_id: req.params.user_id,
                folder_id: result[0].folder_id,
                is_image: is_image
            }
            con.query('INSERT INTO `files` SET ?', data, (err, result)=>{
                if (err) return res.status(500).send(err);
            }); 
        });

        res.status(200).send('ok');
    });
});

app.get('/myprofile/:userid', (req, res)=>{
    con.query('SELECT email, firstname, lastname, id FROM `users` WHERE id = ?', req.params.userid, (err, user)=> {
        if (err) return res.status(500).send(err);
        res.status(200).send(user[0]);
    });
});

app.post('/renamefolder/:folderId', (req, res)=>{
    
    con.query('SELECT * FROM `folders` WHERE folder_id = ?', req.params.folderId, (err, folder)=> {
        if (err) return res.status(500).send(err);

        const oldPath = './upload' + folder[0].main_path + folder[0].name;
        const newPath = './upload' + folder[0].main_path + req.body.name;

        fs.renameSync(oldPath, newPath);
        con.query('SELECT * FROM `files` WHERE folder_id = ?', req.params.folderId, (err, files)=> {
            if (err) return res.status(500).send(err);
            files.forEach(file => {
                const newFileDest = './upload/' + folder[0].user_id + '/' + req.body.name + '/' + file.name;
                con.query('UPDATE `files` SET path = ? WHERE file_id = ?', [newFileDest, file.file_id], (err, result)=> {
                    if (err) return res.status(500).send(err);
                });
            })
        });

        con.query('UPDATE `folders` SET name = ? WHERE folder_id = ?', [req.body.name, req.params.folderId], (err, result)=> {
            if (err) return res.status(500).send(err);
            res.status(200).send({
                name: req.body.name
            });
        }); 

    });

});

app.get('/deletefile/:fileId', (req, res) => {

    con.query('SELECT * FROM `files` WHERE file_id = ?', req.params.fileId, (err, files) => {
        if (err) return res.status(500).send(err);

        fs.unlinkSync('./upload' + files[0].path);
        con.query('DELETE FROM `files` WHERE file_id = ?', req.params.fileId, (err, result)=> {
            if (err) return res.status(500).send(err);
            res.status(200).send('ok')
        });

    });

});

app.get('/deletefolder/:folderId', (req, res)=> {

    con.query('SELECT * FROM `folders` WHERE folder_id = ?', req.params.folderId, (err, folder)=> {
        if (err) return res.status(500).send(err);

        con.query('SELECT * FROM `files` WHERE folder_id = ?', req.params.folderId, (err, files)=> {
            if (err) return res.status(500).send(err);

            files.forEach(file => {
                fs.unlinkSync('./upload' + file.path);

                con.query('DELETE FROM `files` WHERE file_id = ?', file.file_id, (err, result)=> {
                    if (err) return res.status(500).send(err);
                });
            });

            fs.rmdirSync('./upload' + folder[0].main_path + folder[0].name);
            con.query('DELETE FROM `folders` WHERE folder_id = ?', req.params.folderId, (err, result) => {
                if (err) return res.status(500).send(err);
    
                res.status(200).send('Deleted successfully');
            });
        });


    });

});

app.get('/getfolder/:userId/:foldername', (req, res)=> {

    const file = new AdmZip();

    file.addLocalFolder('./upload/' +req.params.userId + '/' + req.params.foldername);

    file.writeZip('./upload/zipFiles/' + req.params.foldername + '.zip');

    res.download(`./upload/zipFiles/${req.params.foldername}.zip`);

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})