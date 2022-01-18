require("dotenv").config();

const Annoucement = require('../models/annoucement');
const annoucementData = require('../data/annoucements');

const annoucementSeeder = async () => {
  try {
      await Annoucement.deleteMany({});
      for (let i = 0; i < 6; i++) {
          await Annoucement.create({
            title: `test${i}`,
            body: `test annoucement body${i}`,
            author: 'staff',
            img: 'uploads/1640511982292.jpg'
          });
      }
      console.log("Annoucement data Import Success");
      process.exit();
  } catch (error) {
      console.error("Annoucement data import Error!!");
      console.error(error);
      process.exit(1);
  }

}

module.exports = annoucementSeeder;