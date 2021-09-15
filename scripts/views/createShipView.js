define(['jquery', 'underscore', 'backbone', 'models/ship', 'routers/router', 'components/dataService'],
 function ($, _, Backbone, Ship, Router, DataService) {
     var createShipView = Backbone.View.extend({
         template: _.template($('#newShip-template-template').html()),
         tagName: 'div',

         initialize: function () {
             this.modelo = new Ship();
         },
         render: function () {
             this.$el.html(this.template(this.modelo.toJSON()));
             return this;
         },
         events: {
             'click #btnBack': 'back',
             'click #guardarEditar': 'crearNueva'
         },
         crearNueva: function (event) {
             event.preventDefault();
             self = this;
             if (this.modelo.set(this.obtengoDatos(), { validate: true })) {
                 DataService.createShip(self.modelo).then(function (newShip) {
                     app.ships.add(newShip);
                     Router.navigate('#/', { trigger: true });
                 });
             }
             else {
                 $('#errorValidacion').text(this.modelo.validationError);
             }
         },
         back: function () {
             Router.navigate('#/', { trigger: true });
         },
         obtengoDatos: function () {
             return {
                 razonSocial: $('#txtShipName').val(),
                 cif: $('#txtPower').val(),

             };
         }
     });
     return createShipView;
 });