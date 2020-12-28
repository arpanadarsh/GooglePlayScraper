
const readline = require('readline');
const fs = require('fs')
var gplay = require('google-play-scraper');
var count = 1;

const rl = readline.createInterface({
  input: fs.createReadStream('sample.txt'),
  output: process.stdout
});

var dd = []
var final = []
var json_file_app
var json_file_permissions

function ff(){
  rl.on('line', function(line){
    var pname = line
    console.log(pname)
    gplay.app({appId: pname, throttle: 10, country: 'in'})
      .then((data) => {
        delete_list = ["url", "description", "descriptionHTML", "summary", "minInstalls", "scoreText", "histogram", "priceText", "androidVersionText", "developer", "developerId", "developerEmail", "developerWebsite","developerAddress", "familyGenre", "familyGenreId", "icon", "headerImage", "screenshots", "video", "videoImage", "contentRatingDescription", "recentChanges", "comments", "privacyPolicy", "developerInternalID"]
        for(var i = 0; i < delete_list.length; i++){
          delete data [delete_list[i]]
        }
        dd.push(data)
        obj = dd.concat(json_file_permissions)
        final.push(obj)
        final_obj = JSON.stringify(final, null, 2)
        fs.writeFile("JagritTest.json", final_obj, (err) => {
          if (err) console.log(err);
          console.log("Finished writing", count);
          count = count+1
        });
      })
      .catch(
        function(error){
          console.log(error)
          console.log("Could not find on Play Store", count);
          count = count+1;
      })

    gplay.permissions({appId: pname})
      .then((data) => {
        json_file_permissions = data
      });
  })
}

ff();
