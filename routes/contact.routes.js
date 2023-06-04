const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middlewares/authenticator");
const { ContactModel } = require("../models/ContactModel");

const contactRouter = express.Router();
contactRouter.use(authenticator);


contactRouter.get("/",async(req,res)=>{
    let token = req.headers.authorization
    jwt.verify(token,"sanjay",async(err,decode)=>{
        try {

            let data = await ContactModel.find({user:decode.userId})
            res.send({
                data:data,
                message:"Success",
                status:1
            })
        } catch (error) {
            res.send({
                message:error.message,
                status:0
            })
        }
    
        
    })

   
   

})

contactRouter.post("/create",async(req,res)=>{


    try {
        let contact = new ContactModel(req.body)
        await contact.save()
        res.send({
            message:"Contact created",
            status:1
        })
    } catch (error) {
        res.send({
            message:error.message,
            status:0
        })
    }



})


contactRouter.patch("/",async(req,res)=>{
    let {id} = req.headers
    try {
        await ContactModel.findByIdAndUpdate({_id:id},req.body)
        res.send({
            message:"Contact updated",
            status:1
        })
    } catch (error) {
        res.send({
            message:error.message,
            status:0
        })
    }
    
})


contactRouter.delete("/",async(req,res)=>{
    let {id} = req.headers
    try {
        await ContactModel.findByIdAndDelete({_id:id})
        res.send({
            message:"Contact deleted",
            status:1
        })
    } catch (error) {
        res.send({
            message:error.message,
            status:0
        })
    }
    
})

module.exports = {
  contactRouter,
};
