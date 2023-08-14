import User from "./User.js";
import Income from "./Income.js";
import Expense from "./Expense.js";
import ExpenseType from "./ExpenseType.js";
import Goal from "./Goal.js";
import GoalCategory from "./GoalCategory.js";
import GoalProgression from "./GoalProgression.js";

// ------------------------- Income Associations -------------------------

Income.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Income);

// ------------------------- Expense Associations ------------------------

Expense.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Expense);

Expense.belongsTo(ExpenseType, {
  foreignKey: "type_id",
  onDelete: "CASCADE",
});

ExpenseType.hasMany(Expense);

// ExpenseType.belongsTo(ExpenseCategory, {
//   foreignKey: "category_id",
//   onDelete: "CASCADE",
// });

// ExpenseCategory.hasMany(ExpenseType);

// -------------------------- Goal Associations --------------------------

Goal.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Goal);

Goal.belongsTo(GoalCategory, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

GoalCategory.hasMany(Goal);

GoalProgression.belongsTo(Goal, {
  foreignKey: "goal_id",
  onDelete: "CASCADE",
});

Goal.hasMany(GoalProgression);

// ------------------------------- Exports -------------------------------

export {
  User,
  Income,
  Expense,
  ExpenseType,
  // ExpenseCategory,
  Goal,
  GoalCategory,
  GoalProgression,
};
