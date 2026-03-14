const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    const photos = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg']; 
    res.render('index', { name: "Sonika", photos });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Editorial running on port ${PORT}`));

module.exports = app;