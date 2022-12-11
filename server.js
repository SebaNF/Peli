const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;

app.use( express.json() );

app.use(express.urlencoded({ extended:true }));

app.use(cors());

require('./server/config/mongoose.config');

const pelisRoutes = require('./server/routes/pelis.routes');

pelisRoutes(app);

app.listen( port, () => console.log('Servidor inicidado en puerto: ', port));