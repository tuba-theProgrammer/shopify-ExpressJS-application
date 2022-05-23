const express = require("express")
const app=express()
const path = require('path')
var mongoose = require('mongoose')
var bodyParser= require('body-parser')
app.set(express.static(path.join(__dirname,"/public")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")

const userModel = require("./models/Users")


const mongoDb='mongodb+srv://tubaAsif:shabana1234@cluster0.soo8g.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoDb, /*We place this to remove warning*/{ useNewUrlParser:
  true, useUnifiedTopology: true }).then(()=>{
  console.log("Connected to MongoDB database")
  }).catch((e)=>{console.log(e.message)})



  // showing Homepage
app.get('/',(req,res)=>{
  res.render("homePage.ejs",{
    title:'HomePage',
   })

})

// showing signup page
app.get('/signUp',(req,res)=>{
  res.render("signUp.ejs",{
    title:'Registration Page',
  })
})
app.post('/signUp',(req,res)=>{
 
    userModel.create(req.body, (err, user) => {
      console.log(req.body)
      if (err) {
        return res.redirect("/signup");
      }
      console.log(user);
      res.redirect("/quizScreen");
    });
 
})



// showing Login page
app.get('/login',(req,res)=>{
  res.render("signIn.ejs",{
    title:'Login Page',
   })

})

app.post('/login',(req,res)=>{
     userModel.findOne({
       name:req.body.name,
       password:req.body.password
     },(err,user)=>{
       if(err){
         console.log(err)
         return res.status(500).send()
       }
       if(!user){
         console.log("user not found")
         return res.status(404).send()
       }
       return res.redirect('/quizScreen')
     })
})

app.get('/quizScreen',(req,res)=>{
  res.render('QuizPage',{
    name:"tuba"
  })
})

// handling user logout
app.get('/logout',(req,res)=>{
  console.log('logging out')
})

app.use('*',(req,res)=>{
  res.status(404).json({msg:"Not found"})
})


app.listen(3001,()=>{
  console.log('hello mai ab phir ap hi ko sun rha hn')
})