import { User } from "../models/User.js";

export class UserController{

    static async createUser(req,res){
        try {

            const user = new User(req.body);
            const created = await user.save()
            console.log(created)
            res.status(200).json({
                "response":created.affectedRows
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
            res.render('index',{users:allUsers})
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                "error":error.message
            })   
        }
    }

    static async showOne(req,res){
        try {
            
            const user = await User.findOne(req.params.id)
            res.status(200).send(user)

        } catch (error) {
            res.status(500).json({
                "error":error.message
            })   
        }
    }

    static async updateUser(req,res){
        try {
            console.log(req.body)
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