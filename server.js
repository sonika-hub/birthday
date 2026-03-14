const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    const photos = ['pic1.png', 'pic2.png', 'pic3.png', 'pic4.png']; 
    res.render('index', { name: "Muskan Disha", photos });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Editorial running on port ${PORT}`));

module.exports = app;