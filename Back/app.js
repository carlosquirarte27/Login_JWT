const express = require('express');
const userRouter = require('./src/modules/users/user.routes');
const circuitRouter = require('./src/modules/circuits/circuit.routes');
const LoginRouter = require('./src/modules/login/login.routes');
const race_resultRouter = require('./src/modules/race_results/race_results.routes');
const raceRouter = require('./src/modules/races/race.routes');
const path = require('path');
const Database = require('./src/core/database');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express(); 



const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use("/", express.static(__dirname + "/public"));

app.use('/api',userRouter);
app.use('/api',circuitRouter);
app.use('/api',LoginRouter);
app.use('/api',race_resultRouter);
app.use('/api',raceRouter);
app.get('/', (req, res) => {
    res.send('this api works!');
});

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger Config
const swaggerOptions = {
    swaggerDefinition: {
        swagger: '2.0',
        info: {
            title: 'Kart Raing!',
            description: 'A Race-Pilot server',
            version: '1.0.0',
            servers: ['http://localhost:'+port]
        }
    },
    apis: ['./src/modules/**/*.routes.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


Database.connect().then(() => {
    // Listen to port
    app.listen(port, () => {
        console.log('App is listening to port ' + port);
    });
});
