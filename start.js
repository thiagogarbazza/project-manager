const cluster = require('cluster');
const os = require('os');

const CPUS = process.env.NODE_CLUSTER_WORKERS || os.cpus();

if (cluster.isMaster) {
  console.log(`Starting ${CPUS} workers...`);

  CPUS.forEach(() => cluster.fork());

  cluster.on("listening", worker => {
    console.log(`Cluster ${process.pid} conectado.`);
  });

  cluster.on("disconnect", worker => {
    console.log(`Cluster ${process.pid} desconectado.`);
  });

  /** It ensures that a new cluster starts up when old die */
  cluster.on("exit", worker => {
    console.log(`Cluster ${process.pid} exit.`);
    cluster.fork();
  });

} else {
  require("./app.js");
}
