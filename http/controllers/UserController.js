const models = require("../../models");

module.exports = {
  async createOrder(req, response) {
    const { customerId, amount, items, isDiscount, discountCode } = req.body;
    if (isDiscount) {
      const ifFound = await models.Discount.findOne({
        where: {
          customer_id: customerId,
          discount_code: discountCode,
          isAvailable: true,
        },
        raw: true,
      });
      if (!ifFound) {
        return response.send({
          code: 401,
          message: "Discount code is not valid",
        });
      } else {
        const record = await models.Orders.create({
          amount: amount,
          customer_id: customerId,
          isDiscount: true,
          discount_code: discountCode,
          discountAmount: amount / 10,
          finalAmount: amount - amount / 10,
        });
      }
    }
    const record = await models.Orders.create({
      amount: amount,
      customer_id: customerId,
      isDiscount: false,
      finalAmount: amount,
    });

    const orderId = record.id;

    items.forEach(async (item) => {
      const recordd = await models.Items.create({
        order_id: orderId,
        item_name: item.name,
        quantity: item.quantity,
        price: item.price,
      });
    });

    const ifFound = await models.Discount.findOne({
      where: {
        customer_id: customerId,
      },
      attributes:['order_number'],
      raw: true,
    });
    
    if (ifFound) {
       await models.Discount.update(
        {
          order_number: ifFound.order_number + 1,
        },
        {
          where: {
            customer_id: customerId,
          },
        }
      ).then((res)=>{
        console.log(res,"This is the res")
      }).catch((err)=>{
        console.log(err)
      })


      if (isDiscount) {
        const record = await models.Discount.update(
          {
            isAvailable: false,
          },
          {
            where: {
              customer_id: customerId,
            },
          }
        );
      }
    } else {
      const record = await models.Discount.create({
        customer_id: customerId,
        order_number: 1,
      });
    }
    return response.send({
      code: 201,
      message: "Order is successfully created",
    });
  },
};
