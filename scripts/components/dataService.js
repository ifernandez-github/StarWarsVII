define(['collections/ships'],
 function (Ships) {
     var DataService = {

         getData: function () {
             var deferred = $.Deferred();
             var ships = new Ships();
             ships.fetch().then(function () {
                 app.ships = ships;
                 deferred.resolve();
             });
             return deferred.promise();
         },
         getBusqueda: function (palabra, tipo) { //Actualizar objeto
            var deferred = $.Deferred();
            app.ships.url = 'busqueda/' + palabra + "/" + tipo;

            app.ships.fetch({
                success: function (model, data) {
                    deferred.resolve();
                },
                error: function () {
                    deferred.reject();
                    console.error("Ha habido un error al obtener los datos del servidor.");
                }
            });
            return deferred.promise();
         },
         getListadoLimpio: function () {
             var deferred = $.Deferred();
             app.ships.url = '/api/ships';
             app.ships.fetch().then(function () {
                 deferred.resolve();
             });
             return deferred.promise();
         },
         updateShip: function (ship) {
             return Backbone.sync('update', ship);
         },
         deleteShip: function (ship) {
             return ship.destroy();
         },
         createShip: function (ship) {
             ship.url = '/api/ships'
             return Backbone.sync('create', ship);
         }
     };
     return DataService;
 });

