//
//    Util
//

var Util = function(){};

Util.syncObjects = function(dest, source, idProperty, toTop){
    if(!idProperty){
        throw 'id property not provided';
    }
    if(!source || !dest){
        return;
    }
    var destIndex = _.indexBy(dest, 
        function(o) { return o[idProperty]; }
        );

    _.each(source, function(sourceObj) {
        var key = sourceObj[idProperty];
        var destObj = destIndex[key];
        
        if(destObj){
            // update
            _.extend(destObj, sourceObj);
            delete destIndex[key];
        }
        else {
            // add
            if(toTop){
                dest.unshift(sourceObj);
            } else{
                dest.push(sourceObj);
            }
        }
    });

    // delete - have to think about how this works with angular
    // _.each(dest, function(elm, idx){
    //     var key = elm[idProperty];
    //     if(_.has(destIndex, key)) {
    //         dest.splice(destIndex, 1);
    //     }
    // });
}

