import { createRequire } from "module"; // Bring in the ability to create the 'require' method


import sequelize from '../config/connection.js';
import { User, Income } from '../models/index.js';

const require = createRequire(import.meta.url); // construct the require method

const userData = require('./userData.json');
const incomeData = require('./incomeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
  await Income.bulkCreate(incomeData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();