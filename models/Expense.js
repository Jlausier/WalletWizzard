const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

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
    categoryId: {
      type: DataTypes.UUID,
      references: {
        model: "finance_category",
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
