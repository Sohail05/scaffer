//Scaffer Object
const scaffer = require("./scaffer.js");
//Optional: Get a beautifer for js
const beautify = require("js-beautify").js_beautify;
//file stream for read/write
const fs = require("fs");
//Required to execute formaters
var exec = require("child_process").exec;

let langs = [
  {lang: "javascript", ext: "js", format:{function:beautify} },
  {lang: "php", ext: "php", format:{command:"php-cs-fixer fix --level=psr2"}} ,
  {lang: "ruby", ext: "rb", format:{command:"rubocop --auto-correct"}}
];

langs.forEach((lang) => {

    //Create a scaffer instance and pass it a .json
    let scafferData = JSON.parse(fs.readFileSync("template/" + lang.lang + ".json", "utf8"));
    var scaffed = new scaffer(scafferData);
    var scaffedTest = new scaffer(scafferData);

    //scaffer chains methods
    scaffed.file().class("Test").method("add", ["a","b"] ).return().variable("a").insert("+").variable("b").endOfLine().end().end();

    scaffedTest.declare("test").assign().instance("Test").endOfLine();
    var scaffedfragment = new scaffer(scafferData);
    scaffedTest.print(scaffedfragment.callMethod("test","add(5,5)").container).endOfLine();
    scaffed.container += scaffedTest.container;

    //Create output directory
    if (!fs.existsSync("./output/")) {
        fs.mkdirSync("./output/");
    }
    //Write file file to ./output/
    fs.writeFile("./output/" + "test." + lang.ext, lang.format.function ? lang.format.function(scaffed.container) : (scaffed.container));
    if(lang.format.command){
      exec( lang.format.command + " ./output/" + "test." + lang.ext);
    }
});
