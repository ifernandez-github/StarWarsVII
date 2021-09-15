define(['backbone', 'models/ship'], function (Backbone, Ship) {
    var ShipBusqueda = Backbone.Collection.extend({
        url: 'https://localhost:44378/api/shipsbyname?shipName=',
        model: Ship
    });
    return ShipBusqueda;
});
