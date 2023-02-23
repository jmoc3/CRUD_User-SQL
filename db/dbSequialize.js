import Sequelize from "sequelize";

export const sequelize  = new Sequelize(
    "prueba",
    "mysql",
    "",
    {
        host: "localhost",
        dialect: "mysql"
    }
)