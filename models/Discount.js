const BaseModel = require("./BaseModel");
class Discount extends BaseModel{
  static init(sequelize, DataTypes) {
    return super.init(
      {
        customer_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        order_number: {
          type: DataTypes.INTEGER,
          defaultValue: null,
        },
        discount_code: {
          type: DataTypes.STRING,
          defaultValue: null,
        },
        isAvailable: {
          type: DataTypes.BOOLEAN,
          defaultValue: null,
        }
      },
      {
        modelName: "Discount",
        tableName: "discount",
        underscored: true,
        sequelize,
      }
    );
  }
}
module.exports = Discount;
