const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', (req, res) => {
    res.render('registration');
});
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (password.length < 8) {
        res.render('registration', { error: 'Error: Password is less than 8 characters' });
    } else {
        res.send('Registration success');
    }
});
app.listen(3000);
