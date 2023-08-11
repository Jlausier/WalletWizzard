import { createRequire } from "module"; // Bring in the ability to create the 'require' method

import sequelize from "../config/connection.js";
import {
  User,
  Income,
  Goal,
  Expense,
  GoalCategory,
  GoalProgression,
  ExpenseCategory,
} from "../models/index.js";

const require = createRequire(import.meta.url); // construct the require method

const userData = require("./userData.json");
const incomeData = require("./incomeData.json");
const goalData = require("./goalData.json");
const goalCategoryData = require("./goalCategoryData.json");
const goalProgressionData = require("./goalProgressionData.json");
const expenseData = require("./expenseData.json");
const expenseCategoryData = require("./expenseCategoryData.json");

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

  await Goal.bulkCreate(goalData, {
    individualHooks: true,
    returning: true,
  });

  await GoalCategory.bulkCreate(goalCategoryData, {
    individualHooks: true,
    returning: true,
  });

  await GoalProgression.bulkCreate(goalProgressionData, {
    individualHooks: true,
    returning: true,
  });

  await Expense.bulkCreate(expenseData, {
    individualHooks: true,
    returning: true,
  });

  await ExpenseCategory.bulkCreate(expenseCategoryData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
