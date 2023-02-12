const models = require("../../models");
const { sequelize } = require("./../../models/index");
const { QueryTypes } = require("sequelize");

module.exports = {
    async generateDiscountCode(req,response){
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        const {customerId}=req.body;

        const ifFound=await models.Discount.findOne({
            where:{
              customer_id:customerId,
            },
            raw:true
          });

        if(ifFound) {
            const orderNumber = ifFound.order_number;
            if(orderNumber%5==4) {
                let result = "";
                const charactersLength = characters.length;
                for ( let i = 0; i < 5; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }

                await models.Discount.update({
                    discount_code:result,
                    isAvailable:true
                },
                {
                 where:
                    {
                    customer_id:customerId,
                    },
                    raw:true
                });
                return response.send({code:201,message:`Your Discount code - ${result}`});
            }

            else {
                return response.send({code:201,message:"Discount code is available only for 5th orders"});
            }
        }
        else {
            return response.send({code:201,message:"Customer is not found"});
        }
    },
    async getDetails(req,response){

        let query = `
        SELECT
           (SELECT COUNT(*) FROM orders) AS total_orders,
           (SELECT COUNT(*) FROM orders WHERE is_discount = 1) AS total_discount_orders,
           (SELECT SUM(amount) FROM orders) AS total_purchased_amount,
           (SELECT SUM(discount_amount) FROM orders) AS total_discount_amount,
           (SELECT SUM(quantity) FROM items) AS total_purchased_items,
           (
            SELECT 
                JSON_ARRAYAGG(JSON_OBJECT(
                "discount_codes",orders.discount_code
                ))
                FROM orders where is_discount=1
            ) as discount_codes
        `;
        
        let result = await sequelize.query(query, {
            type: QueryTypes.SELECT,
          });
        return response.send({code:201,message:result});
    }
};
  