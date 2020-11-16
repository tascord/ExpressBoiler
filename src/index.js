
// General Modules
const path = require('path');
const fs   = require('fs');

// Basic Server Modules
const app  = require('express')();
const http = require('http').createServer(app);
const io   = require('socket.io')(http);

// Setup Server's Settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'web', 'pages'));

// Start The Server
http.listen(3000, console.log('Started!'))

// Accept Incoming GET Requests
app.get('*', (req, res) => {

    let remote = req.path.slice(1);
    if(!remote) remote = 'index';

    // Public File
    if(remote.startsWith('p/')) {

        remote = remote.slice(2);

        if(fs.existsSync(path.join(__dirname, 'web', 'public', remote))) res.sendFile(path.join(__dirname, 'web', 'public', remote));
        else res.status(404).end();

    }
    
    // Page
    else {
        
        remote += '.ejs';
    
        if(fs.existsSync(path.join(__dirname, 'web', 'pages', remote))) res.render(remote);
        else res.render('404.ejs');

    }

})