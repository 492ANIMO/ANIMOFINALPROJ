const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport') , 
LocalStrategy = require('passport-local').Strategy;

//config
const config = require('./config/index');

//middleware
const errorHandler = require('./middleware/errorHandler');

main().catch(err => console.log(err));

// Router
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const clientRouter = require('./routes/client');
const staffRouter = require('./routes/staff');
const authRouter = require('./routes/auth');
const petRouter = require('./routes/pet');
const packageRouter = require('./routes/package');
const vaccineRouter = require('./routes/vaccine');
const treatmentRouter = require('./routes/treatment');
const healthCheckRouter = require('./routes/healthCheck');
const reservationRouter = require('./routes/reservation');
const appointmentRouter = require('./routes/appointment');
const historyRouter = require('./routes/history');
const annoucementRouter = require('./routes/annoucement');
const timeslotRouter = require('./routes/timeslot');

const app = express();

async function main() {
  await mongoose.connect(config.MONGODB_URI);
}

app.use(cors());
app.use(logger('dev'));
app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/uploads', express.static('uploads'));

// Sessions
app.use(session({
  secret: 'secret',
  cookie: {
    maxAge: 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: false 
}))

/**
 * ------ PASSPORT AUTHENTICATION -------
 */
// require the entire Passport config module (so app.js knows about it)
require('./config/passport')(passport);

// passport middleware
// init passport
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);

  next();
})

app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/clients', clientRouter);
app.use('/api/staffs', staffRouter);
app.use('/api/pets', petRouter);
app.use('/api/packages', packageRouter);
app.use('/api/vaccines', vaccineRouter);
app.use('/api/treatments', treatmentRouter);
app.use('/api/healthchecks', healthCheckRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/history', historyRouter);
app.use('/api/annoucements', annoucementRouter);
app.use('/api/timeslots', timeslotRouter);

app.use(errorHandler);

module.exports = app;
