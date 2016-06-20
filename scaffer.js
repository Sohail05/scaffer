module.exports = class scaffer {

    constructor(template) {
        this.template = template;
        this.order = [];
        this.container = "";
    }

    for () {
        this.container += this.template.for.head;
        return this;
    }

    if () {
        this.container += this.template.if.head;
        return this;
    }

    end() {
        this.container += this.template.delimiter.tail + "\n";
        return this;
    }

    else() {
        this.container += this.template.else.head;
        return this;
    }

    elseif() {
        this.container += this.template.elseif.head;
        return this;
    }

    switch () {
        this.container += this.template.switch.head + this.template.switch.tail;
        return this;
    }

    class(name = "$1") {
        this.container += this.template.class.head.replace("$1", name);
        return this;
    }

    function(name = "$1", params = "$2") {
        this.container += this.template.function.head.replace("$1", name).replace("$2", params) +"\n";
        return this;
    }

    insert(string = "$1") {
        this.container += string;
        return this;
    }
    method(name = "$1", params = "$2") {
        if (Array.isArray(params)) {
            params = params.map((value) => {return this.variablePadding(this.template, value);} ).join(", ");
        }
        this.container += this.template.method.head.replace("$1", name).replace("$2", params)+"\n";
        return this;
    }

    instance(name = "$1", params = "") {
        this.container += this.template.class.instance.replace("$1", name).replace("$2", params);
        return this;
    }

    variable(name = "$1") {
        this.container += this.variablePadding(this.template,name);
        return this;
    }
    declare(name = "$1") {
        this.container += this.template.variable.declare.replace("$1", this.variablePadding(this.template,name));
        return this;
    }
    assign() {
        this.container += this.template.variable.assign;
        return this;
    }

    endOfLine() {
        this.container += this.template.delimiter.EOL + "\n";
        return this;
    }

    print(string = "$1") {
        this.container += this.template.system.print.replace("$1", string);
        return this;
    }
    callMethod(name = "$1", method = "$2") {
        this.container += this.template.method.call.replace("$1", this.variablePadding(this.template, name)).replace("$2", method);
        return this;
    }
    variablePadding(template, value) {
        return template.variable.preffix + value + template.variable.suffix;
    }

    file() {
        this.container += this.template.file.head+"\n";
        return this;
    }

    return(){
      this.container += this.template.return + " ";
      return this;
    }

};
