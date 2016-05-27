const cluster = require('cluster');
const os = require('os');
const logger = require('./logger.js');

const CPUS = process.env.NODE_CLUSTER_WORKERS || os.cpus();

if (cluster.isMaster) {
  logger.info(`Starting ${workerCount} workers...`);

  CPUS.forEach(() => cluster.fork());

  cluster.on("listening", worker => {
    logger.info(`Cluster ${worker.process.pid} conectado.`);
  });

  cluster.on("disconnect", worker => {
    logger.info(`Cluster ${worker.process.pid} desconectado.`);
  });

  /** It ensures that a new cluster starts up when old die */
  cluster.on("exit", worker => {
    logger.info(`Cluster ${worker.process.pid} exit.`);
    cluster.fork();
  });

} else {
  require("./app.js");
}
