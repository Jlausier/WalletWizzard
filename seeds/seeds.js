import { createRequire } from "module"; // Bring in the ability to create the 'require' method

import sequelize from "../config/connection.js";
import {
  User,
  Income,
  Goal,
  Expense,
  GoalCategory,
  GoalProgression,
  ExpenseType,
} from "../models/index.js";

const require = createRequire(import.meta.url); // construct the require method

const userData = require("./userData.json");
const incomeData = require("./incomeData.json");
const goalData = require("./goalData.json");
const goalCategoryData = require("./goalCategoryData.json");
const goalProgressionData = require("./goalProgressionData.json");
const expenseData = require("./expenseData.json");
const expenseTypeData = require("./expenseTypeData.json");

const randomInt = (min, max) => {
  const res = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(res);
  return res;
};

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Income.bulkCreate(
    incomeData.map((i) => ({ ...i, userId: users[0].id })),
    {
      individualHooks: true,
      returning: true,
    }
  );

  const goalCategories = await GoalCategory.bulkCreate(goalCategoryData, {
    individualHooks: true,
    returning: true,
  });

  const goals = await Goal.bulkCreate(
    goalData.map((g) => ({
      ...g,
      userId: users[0].id,
      categoryId: goalCategories[0].id,
    })),
    {
      individualHooks: true,
      returning: true,
    }
  );

  await GoalProgression.bulkCreate(
    goalProgressionData.map((gp) => ({ ...gp, goalId: goals[0].id })),
    {
      individualHooks: true,
      returning: true,
    }
  );

  const expenseTypes = await ExpenseType.bulkCreate(expenseTypeData, {
    individualHooks: true,
    returning: true,
  });

  await Expense.bulkCreate(
    expenseData.map((e) => ({
      ...e,
      userId: users[0].id,
      typeId: expenseTypes[randomInt(0, 14)].id,
    })),
    {
      individualHooks: true,
      returning: true,
    }
  );

  process.exit(0);
};

seedDatabase();
