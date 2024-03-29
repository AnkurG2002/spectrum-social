const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

// setup the chat server to be used with socket.io
const cors = require('cors');
app.use(cors());

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);

chatServer.listen(5000, () => {
    console.log('Chat Server is Listening on port: 5000');
});


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use(express.static('./assets'));

// make the upload path available to browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// mongo store is usedto store the sessoin cookie in the db
app.use(session({
    name: 'spectrum',
    // todo change the secret before deployment in production mode
    secret: 'i have a file on you',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://127.0.0.1/spectrum_development',
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


app.use(flash());
app.use(customMiddleware.setFlash);

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        // console.log('Error: ', err);
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
});