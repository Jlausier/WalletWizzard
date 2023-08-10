import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

class GoalCategory extends Model {}

GoalCategory.init(
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
