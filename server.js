const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const uri = 'mongodb+srv://Heba-12:2000776879@cluster0.fn9p7ac.mongodb.net/Graduation?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/signUp', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


app.post('/api/register', async (req, res) => {
    const { email, password, confirmpassword } = req.body;

    if (password !== confirmpassword) {
        return res.status(400).send({ message: 'Passwords do not match' });
    }

    try {
        const newUser = new User({ email, password });

        await newUser.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).send({ message: 'Error registering user', error });
    }
});


app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        if (user.password !== password) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        res.status(200).send({ message: 'Login successful' });
    } catch (error) {
        res.status(500).send({ message: 'Server error', error });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
