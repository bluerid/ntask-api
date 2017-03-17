import cluster from "cluster";
import os from "os";

const CPUS = os.cpus();
if(cluster.isMaster){
	CPUS.forEach(() => cluster.fork());
	cluster.on("listening", worker=>{
		console.log('Cluster one is running. %d', worker.process.pid);
	});
	cluster.on("disconnect", worker=>{
		console.log("Cluster one is disconnected. %d", worker.process.pid);
	});
	cluster.on("exit", worker=>{
		console.log("Cluster one has died. %d", worker.process.pid);
		cluster.fork()
	});
}else{
	require('./index.js');
}