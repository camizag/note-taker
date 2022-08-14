const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('./helpers/uuid');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});


app.post('/api/notes', (req, res)=>{
    console.info(`${req.method} post request received `);

    const {title, text} = req.body;

    if(title && text ){

        const newNote = {
            title: title,
            text: text,
            id: uuid(),
        }
        
        fs.readFile('./db/db.json', 'utf8', (err, data)=>{
            if(err){
                console.log(err)
            }else{
                console.log('Reading the file.')
                const parsedData = JSON.parse(data);
                
                parsedData.push(newNote);

                fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err)=>{
                    err ? console.log('There was a problem saving the note.')
                    : console.log('New note added.');
                });
            }
        });

        res.status(200).sendFile(path.join(__dirname, './db/db.json'));
    }else {
        res.status(500).json(err);
    }

   
});


app.get('/',  (req, res)=>{
    res.sendFile(path.join('/public/index.html'));
});



app.listen(PORT, ()=>{
    console.log(`Port ${PORT} is listening`);
});


