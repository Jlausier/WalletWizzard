import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

class GoalProgression extends Model {}

GoalProgression.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    scheduledDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    goalId: {
      type: DataTypes.UUID,
      references: {
        model: "goal",
        key: "id",
      },
    },
  },
  {
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: "goal_progression",
  }
);

export default GoalProgression;
