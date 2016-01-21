
$(document).ready(function() {
    $.ajax({
        url : "assets/text/index-features.md",
        dataType: "text",
        success : function (md) {
            var features = md.trim().split('###')
                .map(function(ftext) {
                    var pair = ftext.split('\n');
                    if(pair.length < 2) {
                        return null;
                    }
                    return { title: pair[0].trim(), detail: pair[1].trim() };
                })
                .filter(function(x){ return x; });
            features = _.shuffle(features);

            var featureBins = [[],[],[]];
            var width = featureBins.length;
            for(var i = 0, l = features.length ; i < l ; i++) {
                featureBins[i % width].push(features[i]);
            }

            var columnSel = d3.select("#feature-boxes")
                .selectAll("div.feature-col")
                .data(featureBins)
                .enter()
                .append("div")
                .classed("feature-col", true);

            var boxSel = columnSel
                .selectAll("div.feature-box")
                .data(function(d) { return d; })
                .enter()
                .append("div")
                .classed("feature-box", true)
                .attr("tabindex", 0);

            var boxTitleSel = boxSel
                .append("h3")
                .classed("title", true)
                .text(function(d) { return d.title; });

            var boxDetailSel = boxSel
                .append("p")
                .classed("detail", true)
                .text(function(d) { return d.detail; });

        }
    });
}); 

