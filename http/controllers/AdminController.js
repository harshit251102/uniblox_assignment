const models = require("../../models");

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
    }
};
  