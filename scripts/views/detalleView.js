define(['jquery',
        'underscore',
        'backbone',
        'models/ship',
        'routers/router',
        'components/dataService',
        'text!templates/shipDetail.html'],
 function ($, _, Backbone, Ship, Router, dataService, shipDetailTemplate) {
     var detalleView = Backbone.View.extend({
         //template: _.template($('#detalle-template').html()),
         template: _.template(shipDetailTemplate),
         tagName: 'div',
         render: function() {
             this.$el.html(this.template(this.model.toJSON()));
             return this;
         },
         events: {
             'click #btnBack': 'back',
             'click #btnSave': 'update'
         },
         back: function () {
             Router.navigate('#/', { trigger: true });
         },
         update: function (event) {
             event.preventDefault();
             var self = this;
             if (this.model.set(this.obtenDatos(), { validate: true })) {
                 dataService.updateShip(this.model).then(function () {
                     alert('Nave modificada correctamente');
                     Router.navigate('#/', { trigger: true });
                 });
             }
             else {
                 $('#validationError').text(this.model.validationError);
             }
         },
         obtenDatos: function () {
             return {
                 razonSocial: $('#txtShipName').val(),
                 cif: $('#txtPower').val(),

             };
         }
     });
     return detalleView;
 });