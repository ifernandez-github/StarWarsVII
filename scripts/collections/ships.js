define(['backbone', 'models/ship'], function (Backbone, Ship) {
    var Ships = Backbone.Collection.extend({
        url: 'https://localhost:44378/api/ships',
        model: Ship
    });
    return Ships;
});