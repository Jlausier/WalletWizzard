import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

class ExpenseCategory extends Model {}

ExpenseCategory.init(
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
    modelName: "expense_category",
  }
);

export default ExpenseCategory;
