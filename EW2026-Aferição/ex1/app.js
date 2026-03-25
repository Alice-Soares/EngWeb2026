const express = require('express');
const app = express();
const mongoose = require('mongoose');

const repairRouter = require('./routes/repairRouter');

// Middleware
app.use(express.json());

// MongoDB connection
const nomeBD = "autoRepair"
const mongoHost = process.env.MONGO_URL || `mongodb://127.0.0.1:27017/${nomeBD}`
mongoose.connect(mongoHost)
    .then(() => console.log(`MongoDB: liguei-me à base de dados ${nomeBD}.`))
    .catch(err => console.error('Erro:', err));

// Routes
app.use('/repairs', repairRouter);

const PORT = process.env.PORT || 16025;

// Start server
app.listen(PORT, () => {
    console.log(`Servidor ligado na porta ${PORT}`);
});



