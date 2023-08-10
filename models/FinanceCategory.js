import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

class FinanceCategory extends Model {}

FinanceCategory.init(
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
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "finance_category",
  }
);

export default FinanceCategory;

/**
 * Travel
 * Savings
 * Emergency
 * Housing
 * Investment
 */
