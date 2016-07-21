'use strict'

const express = require('express');
const horizon = require('@horizon/server');
const path = require('path');

const app = express();
app.use(express.static('dist'));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const httpServer = app.listen(8081, function(err) {
  if (err) {
    console.log(err);
  } else {
		console.log('Listening on port 8081.');
  }
});

const horizonServer = horizon(httpServer, {
	  auto_create_collection: true,
    auto_create_index: true,
    project_name: 'HorizonWithDocker',
		permissions: false,
		rdb_host: process.env.RDB_HOST || 'localhost',
		rdb_port: process.env.RDB_PORT || 28015,
	  auth: {
		  allow_anonymous: true,
		  allow_unauthenticated: true,
      token_secret: 'HorizonWithDockerIsSecret'
	  }
});
