const BaseModel=require('./BaseModel')
class Orders extends BaseModel{
    static init(sequelize,DataTypes){
        return super.init(
            {
                id:{
                    type:DataTypes.INTEGER,
                    primaryKey:true,
                    autoIncrement:true
                },
                customer_id:{
                    type:DataTypes.INTEGER,
                    defaultValue:null
                },
                amount:{
                    type:DataTypes.INTEGER,
                    defaultValue:null
                },
                isDiscount:{
                    type:DataTypes.BOOLEAN,
                    defaultValue:null
                },
                discount_code:{
                    type:DataTypes.STRING,
                    defaultValue:null
                },
                discountAmount:{
                    type:DataTypes.INTEGER,
                    defaultValue:null
                },
                finalAmount:{
                    type:DataTypes.INTEGER,
                    defaultValue:null
                }
            },
            {
                modelName:'Orders',
                tableName:'orders',
                underscored:true,
                sequelize,
            }
        )
    }
}
module.exports=Orders



















