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
const expenseCategoryData = require("./expenseCategoryData.json");

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

  const expenseCategories = await ExpenseCategory.bulkCreate(
    expenseCategoryData,
    {
      individualHooks: true,
      returning: true,
    }
  );

  const expenseTypes = await ExpenseType.bulkCreate(
    expenseTypeData.map((et) => ({
      ...et,
      categoryId: expenseCategories[0].id,
    })),
    {
      individualHooks: true,
      returning: true,
    }
  );

  await Expense.bulkCreate(
    expenseData.map((e) => ({
      ...e,
      userId: users[0].id,
      typeId: expenseTypes[0].id,
    })),
    {
      individualHooks: true,
      returning: true,
    }
  );

  process.exit(0);
};

seedDatabase();
