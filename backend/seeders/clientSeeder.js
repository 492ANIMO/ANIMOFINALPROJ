require("dotenv").config();
const { faker } = require('@faker-js/faker');

const Client = require('../models/client');

const clientSeeder = async () => {
  try {
      await Client.deleteMany({});
      for (let i = 0; i < 10; i++) {
          await Client.create({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            contact: faker.phone.phoneNumber('06########'),
            
            email: faker.internet.email(),
            address: {
              province: faker.address.state(),
              district: faker.address.country(),
              subdistrict: faker.address.cityName(),
              postalCode: faker.address.zipCode(),
              detail: faker.address.streetAddress(),
            },
            uid: new Date().getTime().toString()
          });

      }
      console.log("Client data Import Success");
      process.exit();
  } catch (error) {
      console.error("Client data import Error!!");
      console.error(error);
      process.exit(1);
  }

}

module.exports = clientSeeder;