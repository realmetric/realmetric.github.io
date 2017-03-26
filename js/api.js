(function () {
    var domain;
    var prefix = 'https://';
    api = {
        setDomain: function (domainUrl) {
            domain = domainUrl;
        },


        receive: function (resource, data, query) {
            var url = resource;

            if (typeof data == 'object') {
                if (query) {
                    url += '?';
                }
                for (var key in data) {
                    if (query) {
                        url += '&' + key + '=' + data[key];
                    } else {
                        url += '/' + key + '/' + data[key];
                    }
                }
            }

            if (['string', 'number'].indexOf(typeof data) != -1) {
                url += '/' + data;
            }

            return this.request(url, 'get');
        },

        create: function (resource, data) {
            return this.request(resource, 'post', data);
        },

        update: function (resource, id, data) {
            var url = resource + '/' + id;
            return this.request(url, 'put', data);
        },

        delete: function (resource, id) {
            var url = resource + '/' + id;
            return this.request(url, 'delete');
        },

        request: function (url, method, data) {
            return ajax({
                method: method,
                url: prefix + domain + '/' + url,
                data: data
            })
        }
    };
})();