//Scaffer Object
const scaffer = require("./scaffer.js");
//Optional: Get a beautifer for js
const beautify = require("js-beautify").js_beautify;
//file stream for read/write
const fs = require("fs");


let langs = [
  {lang: "javascript", ext: "js", format:beautify },
  {lang: "ruby", ext: "rb"}
];

langs.forEach((lang) => {

    //Create a scaffer instance and pass it a .json
    var scaffed = new scaffer(JSON.parse(fs.readFileSync("template/" + lang.lang + ".json", "utf8")));

    //scaffer chains methods
    scaffed.class("Test").method("add", "a,b").insert("return a + b;").end().end();


    //extra snippet for testing generated code
    scaffed.container += lang.ext === "js" ? "\n let test = new Test(); \n console.log(test.add(5,5));" : "";
    scaffed.container += lang.ext === "rb" ? "\n test = Test.new; \n puts test.add(5,5);" : "";

    //Create output directory
    if (!fs.existsSync("./output/")) {
        fs.mkdirSync("./output/");
    }
    //Write file file to ./output/
    fs.writeFile("./output/" + "test." + lang.ext, lang.format ? lang.format(scaffed.container) : (scaffed.container));
});
