function extendable(classRef) {
    assert.isOk(classRef.extend);
    assert.isOk(classRef.e);
    assert.equal(classRef.extend, classRef.e);
    var CustomClass = classRef.extend(function() {
        classRef.call(this);
    });
    var obj1 = new CustomClass();
    assert.isOk(obj1 instanceof classRef);
}

module.exports = extendable;