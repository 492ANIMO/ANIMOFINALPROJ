require("dotenv").config();
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs')

const User = require('../models/user');

const userSeeder = async () => {
  try {
      // await User.deleteMany({});
      for (let i = 0; i < 3; i++) {
        const data = {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          password:  bcrypt.hashSync('123456789', 10),
          contact: faker.phone.phoneNumber('06########'),
          email: faker.internet.email(),
          address: {
            province: faker.address.state(),
            district: faker.address.country(),
            subdistrict: faker.address.cityName(),
            postalCode: faker.address.zipCode(),
            detail: faker.address.streetAddress(),
          },
          role: 'client'
        }

        await User.create(data);
      }
      console.log("User data Import Success");
      process.exit();
  } catch (error) {
      console.error("User data import Error!!");
      console.error(error);
      process.exit(1);
  }
}

module.exports = userSeeder;