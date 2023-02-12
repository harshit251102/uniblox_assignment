const Sequelize=require('sequelize')
const dotenv=require('dotenv')
dotenv.config({path:'.env'})
const env=process.env.NODE_ENV || 'development'
const Items=require('./Items')
const Discount=require('./Discount')
const Orders=require('./Orders')

const sequelize=new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect:'mysql',
        port:process.env.DB_PORT,
        pool:{
            max:5,
            min:0,
            acquire:30000,
            idle:10000
        }
    }
)

const db={
    Items:Items.init(sequelize,Sequelize),
    Discount:Discount.init(sequelize,Sequelize),
    Orders:Orders.init(sequelize,Sequelize)
}
db.sequelize=sequelize;

module.exports=db;