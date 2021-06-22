class ExecPHP {

	constructor() {
		this.phpPath = 'C:/php/php.exe';
		this.phpFolder = "";
	}	

    parseFile(fileName, callback, data= null) {
		var realFileName = this.phpFolder + fileName;
		console.log("file Name: " + fileName);
		console.log('parsing file: ' + realFileName);
		
		var exec = require('child_process').exec;
		console.log(data);
		if(data === null){
			var cmd = this.phpPath + ' ' + realFileName;
		}else{
			var cmd = this.phpPath + ' ' + realFileName + ` name=${data.name} add=${data.add} mobile=${data.mobile} item=${data.item}`;
		}
		console.log("cmd: " + cmd);

		exec(cmd, function(error, stdout, stderr) {
			// console.log(stdout);
			callback(stdout);
		});
	}
}
module.exports = function() {
	return new ExecPHP();
};