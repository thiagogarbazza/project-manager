'use strict';
const cluster = require('cluster');
const os = require('os');
const winston = require('winston');

const CPUS = process.env.NODE_CLUSTER_WORKERS || os.cpus();

if (cluster.isMaster) {
  winston.log(`Starting ${CPUS} workers...`);

  CPUS.forEach(() => cluster.fork());

  cluster.on('listening', worker => {
    winston.log(`Cluster ${worker.pid} conectado.`);
  });

  cluster.on('disconnect', worker => {
    winston.log(`Cluster ${worker.pid} desconectado.`);
  });

  /** It ensures that a new cluster starts up when old die */
  cluster.on('exit', worker => {
    winston.log(`Cluster ${worker.pid} exit.`);
    cluster.fork();
  });
} else {
  require('./src/api/app.js');
}
