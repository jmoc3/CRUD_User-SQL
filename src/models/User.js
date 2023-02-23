
import { connection } from "../../db/db.js";

export class User{

    #nombre;
    #email;
    #edad;

    constructor(body){
        this.#nombre = body.nombre;
        this.#email = body.email;
        this.#edad = body.edad;
    }

    async save(){
        const response = await connection.query("INSERT INTO user_account(nombre,email,edad) VALUES(?,?,?)",[this.#nombre, this.#email,this.#edad])
        return response[0]
    }

    static async all(){
        const response = await connection.query("SELECT * FROM user_account")
        return response[0]
    }

    static async findOne(id){
        const response = await connection.query("SELECT * FROM user_account WHERE id = (?)",[id])
        return response[0]
    }

    static async update(body, id){
        const response = await connection.query("UPDATE user_account SET nombre = (?), email = (?), edad = (?) WHERE id = (?)",[body.nombre, body.email,body.edad, id])
        console.log(response[0])
        return response[0]
    }

    static async delete(id){
        const response = await connection.query("DELETE FROM user_account WHERE id = ?",[id])
        return response[0]
    }

}