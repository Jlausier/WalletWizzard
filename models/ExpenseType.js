import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

class ExpenseType extends Model {}

ExpenseType.init(
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
    category: {
      type: DataTypes.ENUM("savings", "essential", "nonessential"),
      allowNull: false,
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

export default ExpenseType;

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
