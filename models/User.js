import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";
import bcrypt from "bcrypt";

class User extends Model {
  checkPassword = (loginPw) => bcrypt.compare(loginPw, this.password);
}

User.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    darkMode: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (data) => {
        data.password = await bcrypt.hash(data.password, 10);
        return data;
      },
      beforeUpdate: async (data) => {
        data.password = await bcrypt.hash(data.password, 10);
        return data;
      },
    },
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: "user",
  }
);

export default User;
