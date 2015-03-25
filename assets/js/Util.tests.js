

QUnit.test( "deepEqual test", function( assert ) {
  var obj = { foo: "bar" };
 
  assert.deepEqual( obj, { foo: "bar" }, "Two objects can be the same in value" );
});

QUnit.test( "syncObjects", function( assert ) {

    var target = [
        { id: 1, name: "larry", secret: "psst" },
        { id: 2, name: "moe" },
        { id: 3, name: "curly" }
     ];

    var update = [
        { id: 1, name: "larry" },
        { id: 3, name: "straight" }
    ];

    var expected = [
        { id: 1, name: "larry", secret: "psst" },
        { id: 2, name: "moe" },
        { id: 3, name: "straight" }
    ];

    Util.syncObjects(target, update, 'id', false);
    
    assert.deepEqual(target, expected);

});