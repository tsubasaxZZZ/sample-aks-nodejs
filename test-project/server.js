/*--------------------------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
 *-------------------------------------------------------------------------------------------------------------*/

'use strict';

const express = require('express');
const mysql = require('mysql');
const connection = mysql.createConnection({
	host : 'db',
	user: 'root',
	password: 'example',
	database: 'test'
});

connection.connect((err) => {
	if(err) {
		console.error('error occurred: ' + err.stack);
		process.exit(1);
	}
	console.log('connected as id: ' + connection.threadId);
});

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.use('/*', (req, res, next)=>{
	console.log(`${req.ip} - ${req.method} - ${req.originalUrl}`);
	next();
});
app.get('/', (req, res) => {
	res.send("Hello world! Hostname is " + `${process.env.HOSTNAME}`);
});

app.get('/healthz', (req, res) =>{
	connection.query('SELECT * FROM test_table LIMIT 1;', (error) => {
		if(error) {
			console.log(error);
			res.status(503).send(error);
		}else{
			res.send("health check is OK");
		}
	});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
