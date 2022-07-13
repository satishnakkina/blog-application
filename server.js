const express =require('express')
const mongoose =require('mongoose')
const Article=require('./models/article')
const articleRouter=require('./routes/articles')
const methodOverride= require('method-override')
const app=express()

mongoose.connect('mongodb+srv://satish:satish@cluster0.x2wfi.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log("db connected")
}).catch(e => console.log("error occured",e))

app.set('view engine','ejs')
app.use(express.urlencoded({
    extended:false
}))
app.use(methodOverride('_method'))


app.get('/',async(req,res)=>{
    const articles=await Article.find().sort({
        createdAt :'desc'
    })
    res.render('articles/index',{articles:articles})
})
app.use('/articles',articleRouter)