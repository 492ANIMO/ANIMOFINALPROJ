// import model
const Appointment = require('../models/appointment');
const Reservation = require('../models/reservation');
const Timeslot = require('../models/timeslot');

//export function here...
exports.showBookableTime = async (req, res, next) => {
  try {
    // get date
    const { date } = req.body;

    const appointmentTime = await Appointment.find({
      date: date
    });
    const reservationTime = await Reservation.find({
      date: date,
      status: {$ne: 'ยกเลิก'}
    })

    const result = appointmentTime.concat(reservationTime)
    // console.log('result: ' + result);

    let bookedTimes = [];
    bookedTimes = result.map(value => value.time);
    console.log('bookedTimes: '+bookedTimes);

    let toRemove = new Set(bookedTimes);

    let bookableTimes = Timeslot.filter( x => !toRemove.has(x) );

    console.log('bookableTimes: '+bookableTimes);

    res.status(200).json({
      message: 'สำเร็จ',
      result,
      bookedTimes,
      bookableTimes
    });

  } catch (error) {
    next(error);
  }
}

