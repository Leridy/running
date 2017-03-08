Date.prototype.format = function(format) {
    var list = {
        w: this.getDay(),
        S: this.getSeconds(),
        i: this.getMinutes(),
        H: this.getHours(),
        d: this.getDate(),
        M: this.getMonth() + 1,
        Y: this.getFullYear()
    };
    list.W = ['日', '一', '二', '三', '四', '五', '六'][list.w];
    list.h = list.d > 12 ? list.d - 12 : list.d;
    list.m = list.M < 10 ? "0" + list.M : list.M;
    list.s = list.S < 10 ? "0" + list.S : list.S;
    list.y = +list.Y.toString().substr(-2);
    return String(format)
        .replace(/\w/g, function(index) {
            return list[index] || list[index] === 0 ? list[index] : index;
        });
};
String.prototype.printf = function() {
    var i = 0,
        str = this,
        args = Array.prototype.slice.call(arguments);
    if (args[0] instanceof Array) {
        args = args[0];
    }
    return str.replace(/%s/g, function(m) {
        return args[i] === undefined ? m : (i++, args[i - 1]);
    });
};