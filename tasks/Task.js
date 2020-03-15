let taskData;

const fs = require("fs");

if( fs.existsSync("taskData.json") ){
	taskData = JSON.parse(fs.readFileSync("taskData.json"));
}

module.exports = class Task {
	constructor(){
		this.lastExecuteTime = 0;
		this.interval = 300000;

		this.rqp = require("request-promise");
		this.cheerio = require("cheerio");
		this.turndown = require("turndown");
	}

	async execute(){
		throw new Error("Task.execute not implemented");
	}

	async get(item, def){
		if( ! taskData[this.constructor.name] ) taskData[this.constructor.name] = {};
		return taskData[this.constructor.name][item] || def;
	}

	async set(item, val){
		if( ! taskData[this.constructor.name] ) taskData[this.constructor.name] = {};
		taskData[this.constructor.name][item] = val;
		fs.writeFileSync("taskData.json", JSON.stringify(taskData));
	}
}
