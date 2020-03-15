const http2 = require("http2");
const Task = require("./Task");

module.exports = class MicrosoftStoreFreeTask extends Task {
  async execute(){
    let prev = await this.get("prev", []);

    let page = 0;
    let resp = [];
    let items = [];

    do {
      let skip = page*90;
      
      let $ = this.cheerio.load(await new Promise((resolve, reject) => {
        const client = http2.connect('https://www.microsoft.com:443');
        client.on('error', (err) => console.error(err));
  
        const req = client.request({ 
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
          ":authority": "www.microsoft.com",
          ":method": "GET",
          ":path": "/en-us/store/deals/games/pc?price=0To0.001&skipitems" + skip,
          ":scheme": "https",
          "accept": "text/html",
        });
  
        req.setEncoding('utf8');
  
        let data = '';
        req.on('data', (chunk) => { data += chunk; });
        req.on('end', () => {
          resolve(data);
        });
        req.end();
      }));

      $(".m-channel-placement-item").each((_, item) => {
        items.push($(item).data("id"));

        if( prev.indexOf($(item).data("id")) > -1 ) return;
        else {
          resp.push({
            embed: {
              author: {
                name: "Microsoft Store",
                url: "https://microsoft.com/",
                icon_url: "https://s3.cutie.cafe/gloss/icons/microsoft.png"
              },
              title: "Free: " + $(item).find("h3.c-subheading-6").text().trim(),
              url: "https://www.microsoft.com" + $(item).find("a").attr("href").split("?")[0],
              image: {
                url: $(item).find("source").data("srcset")
              }
            },
            type: "giveaway/msstore"
          });
        }
      });

      if( $(".m-channel-placement-item").length < 90 ) break;
      else page++;
    } while( true );

    await this.set("prev", items);

    return resp;
  }
}
