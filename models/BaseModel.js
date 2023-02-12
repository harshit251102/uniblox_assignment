const Sequelize=require('sequelize')
class BaseModel extends Sequelize.Model{
    static getId(where){
        return this.findOne({
            where,
            attributes:['id'],
            order:[['created_at','DESC']]
        })
    }
}
module.exports=BaseModel