const express = require("express");
const cors = require('cors')
const app = express();

//importacion de rutas

const foundryRoutes = require("./routes/foundry");
const weaponsRoutes = require("./routes/weapons");
const armorsRoutes = require("./routes/armor");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

//--------------------

require('dotenv').config();

//Database conection

const mongoose = require('mongoose');

mongoose.set("strictQuery",false);

async function main(){
    await mongoose.connect(process.env.MONGO_CNN);
    console.log('Database connected');
}
main().catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

//Usos de ruta

app.use('/foundries', foundryRoutes);
app.use('/weapons', weaponsRoutes);
app.use('/armors', armorsRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

//Inicio del servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor conectado al puerto: ' + process.env.PORT)
})