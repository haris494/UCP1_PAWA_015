const express = require('express');
const bodyParser = require('body-parser');
const app = express();  // Inisialisasi express app

// Set port untuk aplikasi
const port = 3000;

// Set view engine sebagai EJS
app.set('view engine', 'ejs');

// Middleware untuk parsing data POST
app.use(bodyParser.urlencoded({ extended: true }));

// Menyajikan file statis seperti CSS, JS
app.use(express.static('public'));

// Data hewan yang sementara disimpan dalam array
let animals = [
    { id: 1, name: 'Kucing', species: 'Felix', age: 3 },
    { id: 2, name: 'Anjing', species: 'Bulldog', age: 5 }
];

// Route untuk menampilkan daftar hewan
app.get('/', (req, res) => {
    res.render('index', { animals });  // Kirim data animals ke halaman index.ejs
});

// Route untuk menampilkan form tambah hewan
app.get('/add', (req, res) => {
    res.render('form', { animal: {} });  // Kirim objek kosong untuk form tambah
});

// Route untuk menangani data hewan yang ditambahkan
app.post('/add', (req, res) => {
    const newAnimal = {
        id: animals.length + 1,
        name: req.body.name,
        species: req.body.species,
        age: req.body.age
    };
    animals.push(newAnimal);  // Menambahkan hewan baru ke array
    res.redirect('/');  // Redirect ke halaman utama setelah data ditambahkan
});

// Route untuk menampilkan form edit hewan berdasarkan ID
app.get('/edit/:id', (req, res) => {
    const animalId = parseInt(req.params.id);
    const animal = animals.find(a => a.id === animalId);
    if (animal) {
        res.render('form', { animal });  // Kirim data hewan yang akan diedit ke form.ejs
    } else {
        res.send('Hewan tidak ditemukan!');
    }
});

// Route untuk menangani pembaruan data hewan
app.post('/edit/:id', (req, res) => {
    const animalId = parseInt(req.params.id);
    const updatedAnimal = {
        id: animalId,
        name: req.body.name,
        species: req.body.species,
        age: req.body.age
    };

    // Update data hewan yang ada di array animals
    const index = animals.findIndex(a => a.id === animalId);
    if (index !== -1) {
        animals[index] = updatedAnimal;  // Update data hewan yang ada
        res.redirect('/');  // Redirect ke halaman utama setelah edit
    } else {
        res.send('Hewan tidak ditemukan!');
    }
});

// Menjalankan server pada port yang ditentukan
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
