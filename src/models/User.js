
import { connection } from "../../db/db.js";

export class User{

    #name;
    #email;
    #age;

    constructor(body){
        this.#name = body.name;
        this.#email = body.email;
        this.#age = body.age;
    }

    async save(){
        const response = await connection.query("INSERT INTO user_account(name,email,age) VALUES(?,?,?)",[this.#name, this.#email,this.#age])
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

    static async findEmail(email){
        const response = await connection.query("SELECT * FROM user_account WHERE email = (?)",[email])
        return response[0]
    }

    static async update(body, id){
        const response = await connection.query("UPDATE user_account SET name = (?), email = (?), age = (?) WHERE id = (?)",[body.name, body.email,body.age, id])
        return response[0]
    }

    static async delete(id){
        const response = await connection.query("DELETE FROM user_account WHERE id = ?",[id])
        return response[0]
    }

}