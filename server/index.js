const express = require('express');
const http = require('http')
const morgan = require('morgan');
const routes = require('./routes/');
const cors = require('cors');
const { conn, User } = require('./sqlDB');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { SECRET } = process.env
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const app = express();
const servidor = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(servidor)



//socket.io
io.on('connection', socket =>{

  const hora = new Date().toString().slice(15, 21)
  
  socket.on('conectado', (userName) => {
    console.log( userName, " conectado")
    io.emit('mensajes', {servidor: "servidor", message: `${userName} ha entrado a la sala`, hora})
  })

  socket.on('mensaje', (userName, message, userRole, hora) => {
    io.emit('mensajes', {userName, message, userRole, hora})
  })

  socket.on('desconectado', () => {
    io.emit('mensajes', {servidor: "servidor", message: "ha bandonado la sala", hora})
  })
})

// Middlewares
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
app.use(passport.initialize());
app.use(passport.session());

// passport
passport.use('local', new LocalStrategy({
  usernameField: 'userName',
  passwordField: 'password',
  passReqToCallback: true,
}, async (req, userName, password, done) => {
  try {
    const user = await User.findOne({
      where: {
        userName: userName }
    })
    const validate = await user.matchPassword(password);

    if (!user || !validate) {
      console.log("el ususario no existe")
      return done(null, false, { message: 'Email o contraseña incorrectos' })
    }

    return done(null, user, { message: 'Login successful' })
  } catch (error) {
    return done(error, null, { message: 'Algo salió mal' });
  }
}))

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  User.findOne({
    where: {
      userName: jwt_payload.userName 
    }
  })
    .then( function(user) {
      return done(null, user);
    })
    .catch(err => {
      return done(err, false)
    });
}));

// Routes
app.use('/', routes);

// Port
let force = false;
conn.sync({ force }).then(async () => {
    if (force) {
      User.create({name: "teacher", userName: "Profesor", password: "12345", userRole: "Moderador"});
      User.create({name: "alumn", userName: "Alumno", password: "12345", userRole: "Estudiante"});
    }
    servidor.listen(app.get('port'), () => {
        console.log('PostgresDB connected')
        console.log('Server on port ' + app.get('port')); // eslint-disable-line no-console
      });
});
