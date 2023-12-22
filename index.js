//bismillah 
const express = require('express')
const query = require('./conn.js')
const queryData = require('./conn_query.js')
const db = require('./connect.js')
const swaggerUI = require('swagger-ui-express')
const swDocument =  require('./docs/basicInfo.js')


const uuid4 = require('uuid4')
const mailer = require('./mailer')

const editBook = require('./controllers/editBook.js')
const getOrders = require('./controllers/getOrders.js')
const editOrderStatus = require('./controllers/editOrderStatus.js')
const getRole = require('./controllers/getRole.js')


const app = express()
require('dotenv').config();
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swDocument))
app.use((req,res,next) => {
    res.set('Access-Control-Allow-Origin','*')
    next()
})


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

app.post('/add',async (req,res) => {


    const data = [req.body.name, req.body.author,req.body.cur_price,req.body.prev_price,req.body.sales_per,req.body.description,req.body.cover,req.body.tags,req.body.category,req.body.publisher,req.body.release_year,req.body.isbn,req.body.pages,req.body.size,req.body.cover_type,req.body.weight,req.body.age_restrictions,req.body.presented];

    req.body.cur_price = Number(req.body.cur_price)
    req.body.prev_price = Number(req.body.prev_price)

    console.log(data)

    // if(req.body.tags.includes('скидки')) {
    data[4] = (req.body.prev_price - req.body.cur_price) / (req.body.prev_price / 100) 
    // }
    console.log(data[4])
    const sql = "INSERT INTO `books` (`id`, `name`, `author`, `cur_price`, `prev_price`, `sales_per`,`description`, `cover`, `tags`, `category`, `publisher`, `release_year`, `isbn`, `pages`, `size`, `cover_type`, `weight`, `age_restrictions`, `presented`) VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";


    await queryData(sql, data).then(r => {
        res.send("Данные добавлены")
    })
   
    
 
})

app.get('/getMainData', (req,res) => {
    
    let preparedData = {sales: null, newBooks: null,topSelling: null}

    query("SELECT * FROM `books` WHERE `tags` LIKE '%скидки%' OR `sales_per` > 0 ORDER BY RAND() LIMIT 10")
        .then(r => {
            preparedData.sales = r
            return query("SELECT * FROM `books` WHERE `tags` LIKE '%топ продаж%' ORDER BY RAND() LIMIT 10")
        })
        .then(r => {
            preparedData.topSelling = r
            return query("SELECT * FROM `books` ORDER BY `id` DESC LIMIT 10")
        })  
        .then(r => {
            preparedData.newBooks = r
            res.send(preparedData)
        })


})


app.get('/getBook/:id',(req,res) => {
    const book_id = [req.params['id']]
    console.log('required a book !' + book_id)
    queryData("SELECT * FROM `books` WHERE `id` = ?",book_id).then(r => {
        res.send(r[0])
        console.log(r)
    })
    


})

app.get('/find/:input',(req,res) => {
    const input = [req.params['input']]

    query("SELECT * FROM `books` WHERE `name` LIKE '%" + input + "%' OR `author` LIKE '%" + input + "%' OR `tags` LIKE '%" + input + "%' OR `category` LIKE '%" + input + "%'")
        .then(r => {
            res.send(r)
        })
})


app.get('/categories', async(req,res) => {

    await query("SELECT DISTINCT `category` FROM `books`")
        .then(r => {
            res.send(r)
        })

})


app.post('/getBooksForCart/',(req,res) => {
    const book_ids = req.body.IDs

    query("SELECT * FROM `books` WHERE `id` IN (" + book_ids.join() + ")")
        .then(r => {
            res.send(r)
        })
})


app.post('/signup/',(req,res) => {
    const token = uuid4()
    const data = [req.body.username, req.body.email,req.body.tel,req.body.password,token]
    console.log(data)
    query("SELECT * FROM `clients` WHERE `email` = '" + data[1] +"'")
        .then(r => {
            console.log(r)
            if(!r.length) {
                if(req.body.username.length > 2 && req.body.email.length > 5 && req.body.password.length > 5
                    && req.body.tel.length > 6) {
                        queryData("INSERT INTO `clients`(`id`,`username`,`email`,`tel`,`password`,`token`) VALUES(NULL,?,?,?,?,?)", data)
                        .then(r => {
                            res.send({token: token,status: 200,username: req.body.username,tel: req.body.tel,email: req.body.email})
                        })
                    } else {
                        console.log('error')
                        res.send({status: 401, error: 'Введите правильные данные !'})
                    }
               
            } else {
                res.send({status: 401, error: 'Пользователь уже существует !'})
            }
        })

})



app.post('/login',(req,res) => {
    
    const data = [req.body.tel,req.body.password]
    console.log(data)

    if(data[0].length > 0 && data[1].length > 0) {
        query("SELECT * FROM `clients` WHERE `tel` = '" + data[0] + "' OR `email` = '" + data[0] +  "' AND `password` = '" + data[1] + "'")
        .then(r => {
            console.log(r)
            if(r.length > 0) {
                res.send({token: r[0].token,status: 200,username: r[0].username,tel: r[0].tel,email: r[0].email})
            } else {
                res.send({status: 401, error: 'Неправильная почта или пароль !'})
            }
        })
    } else {
        res.send({status: 401, error: 'Неправильная почта или пароль !'})
    }
   

})




app.post('/makeOrder',(req,res) => {
    const data = [req.body.client_name, req.body.tel,req.body.email,req.body.date,req.body.status,req.body.book,req.body.quantity,req.body.address,req.body.pay_type,req.body.card,req.body.total_price]
    console.log(data)

    db.connection.execute("INSERT INTO `orders`(`id`,`client_name`,`tel`,`email`,`date`,`status`,`book`,`quantity`,`address`,`pay_type`,`card`,`total_price`,`delivery_date`,`notes`) VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,'Неизвестно','')", data,(err, results) => {
        if(err) {
            console.log(err)
        }
        else {
            console.log("Заказ записан !");
            mailer({tel: data[1], email: data[2], address: data[7], card: data[9], name: data[0],book: data[5], price: data[data.length - 1]})
            res.send('Success')
        }
    })

})


app.post('/deleteBook/:id', (req,res) => {
    query("delete from `books` where `id` =" + req.params['id'])
    .then(r => {
        console.log('Deleted !')
        res.send('Deleted !').status(200)
    })
})



app.post('/getOrders',(req,res) => {
    const data = [req.body.username]
    console.log(data)

    // db.connection.execute("SELECT * FROM books INNER JOIN orders ON books.name = orders.book WHERE orders.client_name = '" + data[0] + "' ORDER BY orders.id DESC", (err, results) => {
    //     if(err) {
    //         console.log(err)
    //     }
    //     else {
    //         console.log("Список заказов отдан !");
    //         res.send(results)
    //     }
    // })

    query("SELECT * FROM books INNER JOIN orders ON books.name = orders.book WHERE orders.client_name = '" + data[0] + "' ORDER BY orders.id DESC")
        .then(r => {
            res.send(r)
        })    

})

app.post('/editBook',editBook)
app.post('/editOrderStatus', editOrderStatus)
app.post('/getRole', getRole)
app.get('/orders', getOrders)




















app.listen(PORT, () => console.log(`Server has started on port ${PORT}`))





