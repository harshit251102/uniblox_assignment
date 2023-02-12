const express=require('express')
const app=express()
const port=3000
const path=require('path')
const models=require('./models')
const UserRoutes=require('./routes/user_routes')
const AdminRoutes=require('./routes/admin_routes')
const dotenv=require('dotenv')
dotenv.config({path:'.env'})

console.log(process.env.DB_PORT,"This is the port number")

app.use(express.static(path.join(__dirname,'public')))

models.sequelize
    .sync()
    .then((result,err)=>{
        if(err) throw err
        console.log('Database connected')
    })


app.use((req,res,next)=>{
    req.header('Access-Control-Allow-Origin','*');
    req.header(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization'
    );
    if(req.method==='OPTIONS'){
        req.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use('/api/user/',UserRoutes)
app.use('/api/admin/',AdminRoutes)


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})