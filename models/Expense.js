const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Income extends Model {}

Income.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: "user",
        key: "id",
      },
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
    underscored: true,
    freezeTableName: true,
    modelName: "income",
  }
);

export default Income;

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
