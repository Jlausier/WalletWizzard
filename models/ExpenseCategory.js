import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

class ExpenseCategory extends Model {}

ExpenseCategory.init(
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
