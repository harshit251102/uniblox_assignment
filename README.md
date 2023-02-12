# uniblox_assignment
# To try the project
1. Create a Mysql server on your system on port 3307
2. Go to directory where you saved the folder.
3. In the terminal run the command npm install and then run nodemon app.js
4. Backend server will start at port 3000
5. You can test the APIs using postman
6. I have attached the curl.txt file below from which you can directly import and run the APIs

1. API to place an order without applying discount discount_code

curl --location --request POST 'http://localhost:3000/api/user/createOrder' \
--header 'Content-Type: application/json' \
--data-raw '{
        
        "amount" : "500",
        "customerId" : "1",
        "items" : [{
            "name" :"soap",
            "quantity" : "3",
            "price" : "100"
            },
            {
            "name" :"bottle",
            "quantity" : "1",
            "price" : "150"
            },
            {
            "name" :"shampoo",
            "quantity" : "1",
            "price" : "150"
            },
            {
            "name" :"noodles",
            "quantity" : "2",
            "price" : "100"
            }
        ],
        "isDiscount" : false
}'

2. API to generate discount code
curl --location --request POST 'http://localhost:3000/api/admin/generateDiscountCode' \
--header 'Content-Type: application/json' \
--data-raw '{
    "customerId" : "1"
}'

3. API to place an order after applying discount code
curl --location --request POST 'http://localhost:3000/api/user/createOrder' \
--header 'Content-Type: application/json' \
--data-raw '{
        
        "amount" : "500",
        "customerId" : "1",
        "items" : [{
            "name" :"soap",
            "quantity" : "3",
            "price" : "100"
            },
            {
            "name" :"bottle",
            "quantity" : "1",
            "price" : "150"
            },
            {
            "name" :"shampoo",
            "quantity" : "1",
            "price" : "150"
            },
            {
            "name" :"noodles",
            "quantity" : "2",
            "price" : "100"
            }
        ],
        "isDiscount" : true,
        "discountCode" : "8PuNP"
}'

4. API for admin to get the details of orders placed and items purchased

curl --location --request GET 'http://localhost:3000/api/admin/getDetails'
