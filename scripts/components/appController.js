define(['jquery',
    'underscore',
    'backbone',
    'jquery-ui'], function ($, _, Backbone) {
    var AppController = {
        currentView: null,
        inicio: function () {
            var self = this;
            require(['views/inicioView'], function (InicioView) {
                var view = new InicioView();
                self.renderView.call(self, view);
            });
        },
        detalle: function (id) {
            var self = this;
            require(['views/detalleView'], function (DetalleView) {
                var ships = app.ships.get(id),
                view = new DetalleView({ model: ships });
                self.renderView.call(self, view);

            });
        },
        busqueda: function () {
            var self = this;
            require(['views/inicioView'], function (InicioView) {
                var view = new InicioView();
                self.renderView.call(self, view);
            });
        },
        crearNave: function () {
            var self = this;
            require(['views/createShipView'], function (newShip) {
                var view = new newShip();
                self.renderView.call(self, view);
            });
        },
        renderView: function (view) {
            this.currentView && this.currentView.remove();
            $('#main').html(view.render());
            this.currentView = view;
        }
    }
    return AppController;
});
