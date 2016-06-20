//Scaffer Object
const scaffer = require("./scaffer.js");
//Optional: Get a beautifer for js
const beautify = require("js-beautify").js_beautify;
//file stream for read/write
const fs = require("fs");


let langs = [
  {lang: "javascript", ext: "js", format:beautify },
  {lang: "php", ext: "php" },
  {lang: "ruby", ext: "rb"}
];

langs.forEach((lang) => {

    //Create a scaffer instance and pass it a .json
    let scafferData = JSON.parse(fs.readFileSync("template/" + lang.lang + ".json", "utf8"));
    var scaffed = new scaffer(scafferData);
    var scaffedTest = new scaffer(scafferData);

    //scaffer chains methods
    scaffed.class("Test").method("add", ["a","b"] ).insert("return a + b;").end().end();

    //scaffedTest.variable("test").assign().instance("Test").endOfLine();
    //scaffedTest.print().callMethod("test","add(5,5)").endOfLine();

    //extra snippet for testing generated code
    scaffed.container += lang.ext === "js" ? "\nlet test = new Test(); \nconsole.log(test.add(5,5));" : "";
    scaffed.container += lang.ext === "rb" ? "\ntest = Test.new; \nputs test.add(5,5);" : "";
    scaffed.container += lang.ext === "php" ? "\n$test = new Test(); \necho $test->add(5,5);" : "";


    //Create output directory
    if (!fs.existsSync("./output/")) {
        fs.mkdirSync("./output/");
    }
    //Write file file to ./output/
    fs.writeFile("./output/" + "test." + lang.ext, lang.format ? lang.format(scaffed.container) : (scaffed.container));
});
