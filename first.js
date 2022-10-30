const { default: test } = require("node:test");

const spawner = require("child_process").spawn;
const data_to_pass = "Send this to Python";
console.log("Data sent to python");
const python_process = spawner('python',['./test.py',data_to_pass]);
python_process.stdout.on('data',(data)=>{console.log('Data received from Python:', data.toString())});
//