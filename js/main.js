window.onload = function () {

    var router = new VueRouter({mode: 'history'});

    new Vue({
        router: router,
        el: '#metrics',
        data: {
            metrics: []
        },
        created: function () {
            this.$http.get('https://' + this.$route.query.api + '/metrics').then(function (response) {
                this.metrics = response.body;
            });
        }
    });
}