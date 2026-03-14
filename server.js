const express = require('express');
const path = require('path');
const app = express();

// Force explicit paths for Vercel
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    // Ensure these match your actual filenames in /public/images/ exactly!
    const photos = ['pic1.png', 'pic2.png', 'pic3.png', 'pic4.png']; 
    res.render('index', { name: "Muskan Disha", photos });
});

// DO NOT use app.listen() as the primary export for Vercel
module.exports = app;

// Local testing only
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}