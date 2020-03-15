const Task = require("./Task.js");

module.exports = class TestTask extends Task {
	execute(){
		this.lastExecuteTime = 0;

		let def = {
			embed: {
				author: {
					name: "Cutie Cafe",
					url: "https://cutie.cafe/",
					icon_url: "https://s3.cutie.cafe/logo-g.png"
				},
				title: "To The Moon",
				image: {
					url: "https://s3.cutie.cafe/eva.jpeg"
				},
				description: "When this world is no more\nThe moon is all we'll see\nI'll ask you, to fly away with me\nUntil the stars all fall down\nThey empty from the sky\nBut I don't mind\nIf you're with me\nThen everything's all right.",
				url: "http://freebirdgames.com/to_the_moon/"
			},
			type: "giveaway/epic/epic"
		};

		return [
			def
		];
	}
}
