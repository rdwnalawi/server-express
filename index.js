// import package express
const express = require('express');
// pake express dengan ditampung dalam sebuah variabel app
const app = express();
// import dotenv
require('dotenv').config();
// import mysql connection
const { connectionPool } = require('./config/database');
// pura2 ambil data dari database padahal dari folder data
const fs = require('fs');
// import cors
const cors = require('cors');
// define port
const port = 3000;

// pake cors biar bisa share resource antar frontend dan backend
app.use(cors());
// middleware dari express agar aplikasi express bisa baca data dari request body
app.use(express.urlencoded({extended: true}));
app.use(express.json());
 
// contoh mmiddleware bikin sendiri
const loggerMiddleware = (req, res, next) => {
  const now = new Date();
  const formattedTime = now.toLocaleDateString();
  const method = req.method;
  const url = req.url;
  const status = req.statusCode;
  console.log(`[${formattedTime}] ${method} ${url} - ${status}`);
  next();
};

// pake middleware yg diterapkan di seluruh aplikasi
app.use(loggerMiddleware);

// handle reuest di main routes ('/')
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// rute untuk mengirimkan data produk ke yg request data product
app.get('/products', async (req, res) => {
  // proses logicnya itu ngambil data dari database baru dikirim melalui response
  // tapi di sini  kita pake fake data dulu yaitu ambil data dari /products.json
  // fs.readFile('./products.json', (error, data) => {
  //   if (error) res.send ('Gagal dalam memuat data');
  //   const products = JSON.parse(data);
  //   res.status(200).send(products);
  // });  

  // skrg ambil data dari database pake connection pool
  const connection = await connectionPool.getConnection()
  try {
    const [products] = await connection.query(`select * from product`);
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
  }
});


// request params
// rute untuk ngambil data berdasarkan id
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  // filter data berdasarkan id yang masuk lewat query params
  // karena data masih belum dari database, kita pake logic js sederhana aja
  // fs.readFile("./products.json", (error, data) => {
  //  if (error) res.send("Gagal dalam pembacaan data");
  //  const products = JSON.parse(data);
  //  const product = products.find((product) => product.id === parseInt(id));
  //  if (!product) {
  //   res.status(404).send("Product not found");
  //  }
  //  res.status(200).send(product);
  // });

  // ambil data dari database berdasarkan id
  const connection = await connectionPool.getConnection()
  try {
    const [products] = await connection.query(`select * from product where id = ?`, [id]);
    if (!products.length) {
      res.status(404).send('Product not found');
    } else {
    res.status(200).send(products);
    }
  } catch (error) {
    console.log(error);
  }
 });


// rute untuk mengirim data produk 
app.post('/products', async (req, res) => {
  // destructuring object dari request body
  const { name, price, image_url, catalog_id, created_at } = req.body
  // kalo pake SQL nanti eksekusinya pake query (misal: INSERT INTO <nama tabel> dst...)
  // skrg masukin ke json dulu aja
  // fs.readFile('./products.json', (err, data) => {
  //   if (err) res.send('Gagal dalam membaca json');
  //   const products = JSON.parse(data);
  //   const newProduct = {
  //     id: products.length + 1,
  //     name: name,
  //     price: price,
  //     catalog: catalog
  //   };
  //   // push new product ke products
  //   products.push(newProduct);

  //   fs.writeFile('./products.json', JSON.stringify(products, "", 2),
  //   (err) => {
  //     if (err) res.status(400).send('Gagal dalam memasukkan data');
  //     res.status(201).send({data: newProduct});
  //   });
  // });

  // masukin data ke database
  const connection = await connectionPool.getConnection()
  try {
    const createdProduct = await connection.query(`INSERT INTO Product (name, price, image_url, catalog_id, created_at)
    VALUES (?, ?, ?, ?, ?)`, [name, price, image_url, catalog_id, created_at]);
    res.status(201).send(createdProduct);
  } catch (error) {
    console.log(error);
  }
});

// rute untuk menangkap request ke rute yg tidak dikenal
app.all('*', (req, res) => {
    res.status(404).send('404 routes not found');
});
 
// nyalakan servernya
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});