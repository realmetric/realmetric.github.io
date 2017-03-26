(function () {
    var loaded = false;
    var callbacks = [];
    loadHandler = {
        add: function (callback) {
            if (loaded) {
                callback();
            } else {
                callbacks.push(callback);
            }
        }
    };

    window.onload = function () {
        loaded = true;
        for (i in callbacks) {
            callbacks[i]();
        }
    };
})();