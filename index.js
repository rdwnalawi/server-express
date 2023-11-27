const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const port = 3000;

app.use(cors());
 
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/products', (req, res) => {
  fs.readFile('./products.json', (error, data) => {
    if (error) res.send ('Gagal dalam memuat data');
    const products = JSON.parse(data)
    res.status(200).send(products);
  })  
});

app.all('*', (req, res) => {
    res.status(404).send('404 routes not found');
});
 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});



// const express = require('express')
// const app = express()
// const PORT = 3000
 
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
 
// app.get('/about', (req, res) => {
//   res.send('About Page')
// })
 
// app.get('/halaman-baru', (req, res) => {
//   res.send('Halaman Baru')
// })
 
// app.post('/kontak', (req, res) => {
//   console.log(req.body)
//   // dilanjutkan dengan logic untuk menyimpan data kontak atau mengirim email
//   res.status(201).send('Kontak berhasil dikirim')
// })
 
// app.listen(PORT, () => {
//   console.log(`Example app listening at http://localhost:${PORT}`)
// })




// const express = require('express')
// const app = express()
// const PORT = 4000
 
// // fungsi dari penggunaan kode ini adalah untuk mengubah request body yang awalnya berbentuk string menjadi object, dari request yang tidak terbaca oleh server bisa dimengerti oleh server yang dibuat
 
// app.use(express.json())
 
// app.post('/users', (req, res) => {
//   console.log(req.body)
//   res.send('POST Request Success!')
// })
 
// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`)
// })


// const app = require("express")();
 
// app.get("/", (req, res) => {
//   res.send(req.query);
// });
 
// app.listen(3000, () => console.log("Server running on port 3000"));


// const app = require("express")();
 
// app.get("/:name/:age", (req, res) => {
//   res.send(req.params);
// });
// app.listen(3000, () => console.log("Server running on port 3000"));