import express from "express";
import { User } from "../src/models/User.js";
import { UserController } from "../src/controllers/User.controller.js";

let router = express.Router();

/* GET home page. */
router.get('/', async(req, res)=>{
  const allUsers = await User.all()
  res.render('index', { users: allUsers });
});
router.get('/user/all', UserController.showAll)
router.get('/user/one/:id', UserController.findOne)
router.get('/user/email/:email', UserController.findOneForEmail)

router.post('/user/create',UserController.createUser)
router.put('/user/update/:id',UserController.updateUser)
router.delete('/user/delete/:id',UserController.deleteUser)

export default router
