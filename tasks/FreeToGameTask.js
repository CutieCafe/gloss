const Task = require("./Task.js");

module.exports = class FreeToGameTask extends Task {
    async execute(){
        let prev = await this.get("prev", []);
        let $ = this.cheerio.load(await this.rqp("https://www.freetogame.com/giveaways"));

        let fin = [];

        $(".giveaways_area > .giveaway-card").each((_, i) => {
            if( prev.indexOf($(i).find(".card-img-top").attr("src")) > -1 ) return; 

            fin.push({
                embed: {
                    author: {
                        name: "FreeToGame",
                        url: "https://freetogame.com/",
                        icon_url: "https://s3.cutie.cafe/gloss/icons/freetogame.jpg"
                    },
                    title: $(i).find(".card-title").text().trim(),
                    url: "https://freetogame.com" + $(i).find("a").attr("href"),
                    image: {
                        url: "https://freetogame.com" + $(i).find("img").attr("src")
                    }
                },
                type: "giveaway/freetogame"
            });

            prev.push($(i).find(".card-img-top").attr("src"));
        });

        await this.set("prev", prev);
        return fin;
    }
}
