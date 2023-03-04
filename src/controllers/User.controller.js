import { User } from "../models/User.js";

export class UserController{

    static async createUser(req,res){
        try {

            const user = new User(req.body);
            const created = await user.save()

            res.status(200).json({
                "response":created
            })

        } catch (error) {
            res.status(500).json({
                "error":error.message
            })   
        }
    }

    static async showAll(req,res){
        try {

            const allUsers = await User.all()
            res.status(200).json({
                "users": allUsers
            })
            
        } catch (error) {
            res.status(500).json({
                "error":error.message
            })   
        }
    }

    static async findOne(req,res){
        try {
            
            const user = await User.findOne(req.params.id)
            res.status(200).send(user)

        } catch (error) {
            res.status(500).json({
                "error":error.message
            })   
        }
    }

    static async findOneForEmail(req,res){
        try {

            const user = await User.findEmail(req.params.email)
            res.status(200).json({
                "user":user[0]
            })

        } catch (error) {
            res.status(500).json({
                "error":error.message
            })   
        }
    }

    static async updateUser(req,res){
        try {
            
            const userUpdated = await User.update(req.body,req.params.id)
            res.status(200).json({
                "response":userUpdated.affectedRows
            })

        } catch (error) {
            res.status(500).json({
                "error":error.message
            })   
        }
    }

    static async deleteUser(req,res){
        try {
            
            const userDeleted = await User.delete(req.params.id)
            res.status(200).json({
                "response":userDeleted.affectedRows
            })

        } catch (error) {
            res.status(500).json({
                "error":error.message
            })   
        }
    }
}