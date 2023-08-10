const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class ExpenseCategory extends Model {}

ExpenseCategory.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryName: {
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

module.exports = ExpenseCategory;
