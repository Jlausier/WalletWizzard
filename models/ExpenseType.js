const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class ExpenseType extends Model {}

ExpenseType.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      references: {
        model: "expense_category",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "expense_type",
  }
);

module.exports = ExpenseType;

/**
 * Housing
 * Utilities
 * Groceries / household essentials
 * Vehicle
 * Internet/cable/streaming
 * Phone
 * Debt payments
 * Subscriptions / memberships
 * Child care
 * Health care
 * Emergency
 * Travel
 * Dining
 * Entertainment
 */
