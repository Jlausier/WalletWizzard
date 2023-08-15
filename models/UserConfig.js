import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

class UserConfig extends Model {}

UserConfig.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM("income", "expense", "goal"),
      allowNull: false,
    },
    sum: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    period: {
      type: DataTypes.INTEGER,
      defaultValue: 6,
    },
    interval: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    group: {
      type: DataTypes.ENUM("month", "category", "type", "table", "none"),
      defaultValue: "month",
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: "user_config",
  }
);

export default UserConfig;
