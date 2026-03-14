const express = require('express');
const path = require('path');
const app = express();

// Use path.join to ensure Vercel finds the views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    // Matches your pic1.png, pic2.png files from the git commit
    const photos = ['pic1.png', 'pic2.png', 'pic3.png', 'pic4.png']; 
    res.render('index', { name: "Sonika", photos });
});

// Important: Vercel needs the app exported
module.exports = app;

// Keep this for local testing
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}