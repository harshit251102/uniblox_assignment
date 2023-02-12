const BaseModel=require('./BaseModel')
class Items extends BaseModel{
    static init(sequelize,DataTypes){
        return super.init(
            {
                id:{
                    type:DataTypes.INTEGER,
                    primaryKey:true,
                    autoIncrement:true
                },
                item_name:{
                    type:DataTypes.STRING,
                    defaultValue:null
                },
                quantity:{
                    type:DataTypes.INTEGER,
                    defaultValue:null
                },
                price:{
                    type:DataTypes.INTEGER,
                    defaultValue:null
                },
                order_id:{
                    type:DataTypes.STRING,
                    defaultValue:null
                }
            },
            {
                modelName:'Items',
                tableName:'items',
                underscored:true,
                sequelize,
            }
        )
    }
}
module.exports=Items



















