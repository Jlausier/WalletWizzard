import User from "./User";
import Income from "./Income";
import Expense from "./Expense";
import ExpenseType from "./ExpenseType";
import Goal from "./Goal";
import FinanceCategory from "./FinanceCategory";

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

Expense.belongsTo(FinanceCategory, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

FinanceCategory.hasMany(Expense, {
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

Goal.belongsTo(FinanceCategory, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

FinanceCategory.hasMany(Goal, {
  foreignKey: "category_id",
});

export {};
