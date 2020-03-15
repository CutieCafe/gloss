const tasks = [];
const Task = require("./Task.js");

let addTasks = process.argv.slice(2);

let bindTask = task => {
	if( ! task instanceof Task ){
		console.log("Warning: one of your tasks does not extend Task");
		return;
	}
	else tasks.push(task);
};

for( let item of addTasks ){
	console.log("Using task " + item);
	bindTask(new (require("./" + item + ".js")));
}

setInterval(async () => {
	for( let task of tasks ){
		if( Date.now()-task.lastExecuteTime >= task.interval ){
			task.lastExecuteTime = Date.now();
			try {
				for( let s of await task.execute() ){
					console.log("[" + s.type + "] " + (new Date()).toString() + " >>");
					console.log("Author: " + s.embed.author.name + " (" + s.embed.author.url + " // " + s.embed.author.icon_url + ")");
					console.log("Title: " + s.embed.title + " | " + s.embed.url);
					console.log("AppID: " + s.appid);
					s.embed.image && s.embed.image.url ? console.log("Image: " + s.embed.image.url) : null;
					s.embed.description ? console.log("Description: " + s.embed.description) : null;
					console.log(JSON.stringify(s.embed, null, 4));
					console.log("===================================================");
				}
			} catch(e) {
				console.log("Error running task " + task.constructor.name + ":", e.stack);
			}
		}
	}
}, 1000);
