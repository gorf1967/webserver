const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3010;

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',()=>{
   return new Date().getFullYear();
})

app.use((req,res,next)=>{
    let now = new Date().toString();
    let msg = `Time: ${now}, Url: ${req.method}, ${req.url}`;
    console.log(msg);
    fs.appendFile('log.txt',msg + '\n', (error)=>{
        console.log('error writing to log');
    });
    next();
});


app.use((req,res,next)=>{
    let now = new Date().toString();
    let msg = `Error: ${now}, Url: ${req.method}, ${req.url}`;
    console.log(msg);
    fs.appendFile('log.txt',msg + '\n', (error)=>{
        console.log('error writing to log');
    });
    res.render('maintenence.hbs');
});

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        name: 'Ronnie'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
    });
});

app.get('/home',(req,res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        name: 'Ronnie'
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        message: 'error message',
        errno: 2134
    })
})

app.listen(port,()=>{
    console.log(`server is up and running on port ${port}`);
});
