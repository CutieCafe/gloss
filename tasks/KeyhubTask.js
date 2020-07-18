const Task = require("./Task");

module.exports = class KeyHubTask extends Task {
    async execute(){
        let prev = await this.get("prev", []);
        let res = [];

        let $ = this.cheerio.load(await this.rqp("https://key-hub.eu/"));
        
        for( let i of $(".keylist").first().find(".col-md-4").toArray() ){
            let pElem = $(i).find("a").first().attr("href");

            if( prev.indexOf(parseInt(pElem.split("/")[2])) > -1 ) continue;

            let $$ = this.cheerio.load(await this.rqp("https://key-hub.eu" + pElem));
            
            let title = $$("title").text().replace(" - Key-hub.eu", "");

            res.push({
                embed: {
                    author: {
                        name: "Key-hub",
                        url: "https://key-hub.eu/",
                        icon_url: "https://s3.cutie.cafe/gloss/icons/keyhub.png"
                    },
                    title,
                    url: "https://key-hub.eu" + pElem,
                    image: {
                        url: $$(".img-fluid").attr("src")
                    }
                },
                type: "giveaway/keyhub"
            });

            prev.push(parseInt(pElem.split("/")[2]));
        }

        await this.set("prev", prev);

        return res;
    }
}