
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

            var boxSel = d3.select("#feature-boxes")
                .selectAll("div.feature")
                .data(features)
                .enter()
                .append("div")
                .classed("feature", true);

            var boxTitleSel = boxSel
                .append("h3")
                .classed("title", true)
                .text(function(d) { return d.title; });

            var boxDetailSel = boxSel
                .append("div")
                .classed("detail", true)
                .append("p")
                .text(function(d) { return d.detail; });

            boxSel.on("click", function(d){
                var sel = d3.select(this);
                sel.classed("opened", !sel.classed("opened"));
            });
        }
    });
}); 

