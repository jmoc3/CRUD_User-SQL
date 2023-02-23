import { DataType, DataTypes } from "sequelize";
import { sequelize } from "../../db/dbSequialize";

sequelize.define('user_account',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull:false
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false
    },
    edad:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
})