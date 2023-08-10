import User from "./User.js";
import Income from "./Income.js";
import Expense from "./Expense.js";
import ExpenseType from "./ExpenseType.js";
import ExpenseCategory from "./ExpenseCategory.js";
import Goal from "./Goal.js";
import GoalCategory from "./GoalCategory.js";
import GoalProgression from "./GoalProgression.js";

// ------------------------- Income Associations -------------------------

Income.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Income, {
  foreignKey: "user_id",
});

// ------------------------- Expense Associations ------------------------

Expense.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Expense, {
  foreignKey: "user_id",
});

Expense.belongsTo(ExpenseType, {
  foreignKey: "type_id",
  onDelete: "CASCADE",
});

ExpenseType.hasMany(Expense, {
  foreignKey: "type_id",
});

ExpenseType.belongsTo(ExpenseCategory, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

ExpenseCategory.hasMany(ExpenseType, {
  foreignKey: "category_id",
});

// -------------------------- Goal Associations --------------------------

Goal.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Goal, {
  foreignKey: "user_id",
});

Goal.belongsTo(GoalCategory, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

GoalCategory.hasMany(Goal, {
  foreignKey: "category_id",
});

GoalProgression.belongsTo(Goal, {
  foreignKey: "goal_id",
  onDelete: "CASCADE",
});

Goal.hasMany(GoalProgression, {
  foreignKey: "goal_id",
});

// ------------------------------- Exports -------------------------------

export {
  User,
  Income,
  Expense,
  ExpenseType,
  ExpenseCategory,
  Goal,
  GoalCategory,
};
