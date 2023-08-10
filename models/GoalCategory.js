import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

class GoalCategory extends Model {}

GoalCategory.init(
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
    modelName: "goal_category",
  }
);

export default GoalCategory;

/**
 * Travel
 * Savings
 * Emergency
 * Housing
 * Investment
 */
