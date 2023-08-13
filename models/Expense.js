import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

class Expense extends Model {}

Expense.init(
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
    scheduledDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: "user",
        key: "id",
      },
    },
    typeId: {
      type: DataTypes.UUID,
      references: {
        model: "expense_type",
        key: "id",
      },
    },
  },
  {
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: "expense",
  }
);

export default Expense;
