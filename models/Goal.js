import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

class Goal extends Model {}

Goal.init(
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
    currentAmount: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      defaultValue: 0,
    },
    desiredAmount: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    reminder: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
        model: "goal_category",
        key: "id",
      },
    },
  },
  {
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: "goal",
  }
);

export default Goal;
