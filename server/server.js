const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')
const bcrypt = require('bcrypt')
const cors = require('cors')
const app = express()


app.use(express.json())
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173', 
}))
mongoose.connect('mongodb://localhost:27017/Auth')
const bcryptSalt = bcrypt.genSaltSync(8)


app.get('/' , (req , res)=>{
    res.send('hello there')
})


app.post('/register' , async (req , res)=>{
    try{
        const {name  , email , password} = req.body
        const UserDoc =  await User.create({
        name , email , 
        password: bcrypt.hashSync(password, bcryptSalt),
    })
    res.json('user registerd')
    }
    
    catch(err){
        console.log(err)
        res.status(422).json('email already used')
    }
})

app.post('/login' , async (req ,res)=>{
    const {email , password} = req.body
    const UserDoc = await User.findOne({email})
    const compare = bcrypt.compareSync(password , UserDoc.password)
    if(UserDoc && compare){
        res.json('user Auth')
    }else{
        res.status(422).json('user not found ')
    }
})


app.listen(1111 , ()=>{
    console.log('app is runing on part 1111')
})