const Task = require("./Task.js");

module.exports = class PrysTask extends Task {
  async execute(){
    let prev = await this.get("prev", []);

    let $ = this.cheerio.load(await this.rqp("https://prys.revadike.com/"));

    let total = [];

    $("a[href^='/giveaway/?']").each((_, j) => {
      let id = $(j).attr("href").split("id=")[1];
      if( prev.indexOf(id) > -1 ) return;

      total.push({
        embed: {
          author: {
            name: "Prys",
            url: "https://prys.revadike.com/",
            icon_url: "https://s3.cutie.cafe/gloss/icons/prys.png"
          },
          title: "New Prys giveaway: " + $(j).text().trim(),
          url: "https://prys.revadike.com/giveaway/?id=" + id
        },
        type: "giveaway/prys"
      });

      prev.push(id);
    });

    await this.set("prev", prev);

    return total;
  }
}
