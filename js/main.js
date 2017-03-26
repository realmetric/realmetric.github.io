(function () {
    // Prepare
    var params = getUrlParams()
    api.setDomain(params.api)

    // List metrics
    api.receive('values/minutes', {metric_id: 15}, true)
        .then(function (data) {
            var minutes = data.values['2017-03-25'];
            var data = [];


            var count = 0;
            for (var i = 1; i <= 1440; i++) {
                if (minutes[i]) {
                    count += minutes[i];
                }

                if (i % 5 == 0) {
                    data.push({x: i, y: count});
                    count = 0;
                }
                // data.push({x: i, y: +minutes[i]});

            }
            // data = data.slice(-500);
            loadHandler.add(function () {
                graph(data);
            });
        });


    function graph(data) {
        var graph = new Rickshaw.Graph({
            element: document.getElementById('graph'),
            renderer: 'bar',
            height: 300,
            padding: {top: 0, right: 0, bottom: 0, left: 0},
            series: [
                {
                    color: 'steelblue',
                    name: 'today',
                    data: data
                }
            ]
        });
        graph.render();


        var hoverDetail = new Rickshaw.Graph.HoverDetail({
            graph: graph
        });

        var legend = new Rickshaw.Graph.Legend({
            graph: graph,
            element: document.getElementById('legend')

        });

        var xAxis = new Rickshaw.Graph.Axis.Time({
            graph: graph
        });
        xAxis.render();

        var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
            graph: graph,
            legend: legend
        });

        var axes = new Rickshaw.Graph.Axis.Time({
            graph: graph
        });
        axes.render();

    }


})();