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
        this.container += "\n"+this.template.delimiter.tail;
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
        this.container += this.template.function.head.replace("$1", name).replace("$2", params);
        return this;
    }

    insert(string = "$1") {
        this.container += "\n"+string;
        return this;
    }
    method(name = "$1", params = "$2") {
        this.container += this.template.method.head.replace("$1", name).replace("$2", params);
        return this;
    }

};
