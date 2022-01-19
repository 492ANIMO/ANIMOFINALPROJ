// import model
const Appointment = require('../models/appointment');
const Timeslot = require('../models/timeslot');

//export function here...
exports.showBookableTime = async (req, res, next) => {
  try {
    const { date } = req.body;

    const result = await Appointment.find({
      date: date
    });

    if(!result){ throw new Error('ไม่พบข้อมูล'); }

    let bookedTimes = [];
    bookedTimes = result.map(value => value.time);
    console.log(bookedTimes);

    let toRemove = new Set(bookedTimes);

    let bookableTimes = Timeslot.filter( x => !toRemove.has(x) );

    console.log(bookableTimes);



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

