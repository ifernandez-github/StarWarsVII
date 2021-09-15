define(['jquery',
        'underscore',
        'backbone',
        'kendo',
        'views/shipView',
        "routers/router",
        'components/dataService',
        'text!templates/ships.html'],
 function ($, _, Backbone, kendo, shipView, Router, dataService, shipsTemplate) {
     var inicioView = Backbone.View.extend({
         //template: _.template($('#inicio-template').html()),
         template: _.template(shipsTemplate),
         el: '#inicio',
         objetoLista: null,
         initialize: function () {
             //this.collection = app.ships;
             /*this.arrayShips = new Array();
             this.collection.each(function (Item) {
                 this.arrayShips.push(Item);
             }, this);*/
         },
         events: {
             'click #btnAtras': 'back',
             'click #btnBuscador': 'search',
             'keypress #buscador': 'beforeSearch',
             'click #creteShip': 'createShip'
         },
         render: function (input, palabra) {
             this.$el.empty();
             //this.$el.html(this.template(this.collection.toJSON()));
             this.$el.html(this.template());
             //this.$el.append(this.creaBoton());
             //this.jquery(input, palabra);
             //this.$el.find('#main').append(this.template());
             // var cont = 1;

             /*var grid = $("#grid").data("kendoGrid");
             var grid = kendo.grid("#grid");
             grid.dataSource({
                 type: "json",
                 data: this.arrayShips,
                 pageSize: 20,
             })*/

             /*kendo.grid("#grid")({
                 dataSource: {
                     type: "json",
                     data: this.arrayShips,
                     pageSize: 20,
                 },
                 height: 550,
                 groupable: true,
                 sortable: true,
                 pageable: {
                     refresh: true,
                     pageSizes: true,
                     buttonCount: 5,
                 },
                 columns: [
                     {
                         template:
                             "<div class='customer-photo'" +
                             //"style='background-image: url(../imagesStarWars/#:data.idShip#.png);'></div>" +
                             "<div class='customer-name'>#: shipName #</div>",
                         field: "shipName",
                         title: "Nave",
                         width: 240,
                     },
                     {
                         field: "power",
                         title: "Power",
                     },

                 ],
             });*/
            //GRID

             $("#grid").kendoGrid({
                 dataSource: {
                     type: "json",
                     data: app.ships.toJSON(),
                     pageSize: 20,
                 },
                 selectable: true,
                 height: 550,
                 groupable: true,
                 sortable: true,
                 pageable: {
                     refresh: true,
                     pageSizes: true,
                     buttonCount: 5,
                 },
                 columns: [
                     {
                         template:
                             //"<div class='customer-photo'" +
                             "<div style='background-image: url(../scripts/imagesStarWars/#:data.idShip #.png);'></div>" +
                             "<div class='customer-name'>#: shipName #</div>",
                         field: "shipName",
                         title: "Nave",
                         width: 250,
                     },
                     {
                         field: "power",
                         title: "Power",
                         width: 100
                     },
                     {
                         field: "armyName",
                         title: "Ejército",
                         width: 240
                     },

                 ],
             });

             var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
             popupNotification.show("Bienvenidos al universo StarWars", "info");


             /*this.objetoLista = this.$el.find('#lista');

             this.collection.each(function (item) {
                 this.addOne(item);
             }, this);
             return this;
*/
         },

         jquery: function(input, palabra){
             
             if (typeof (input) === "undefined") {
                 this.$('#tipoR').attr('checked', 'checked');
             } else {
                 this.$('#' + input).attr('checked', 'checked');
             }
             if (palabra !== undefined) {
                 this.$('#buscador').attr("value", palabra)
             }
             
         },
         createShip: function () {
            Router.navigate("#/crearNave", { trigger: true });
         },
         addOne: function (ship) {
             var view = new shipView({ model: ship });
             this.objetoLista.append(view.render().el);
             //this.$el.append(view.render().el);
             this.$('li.col-md-4').css('display', 'none');
             this.$("li.col-md-4").slideDown("slow");
             
         },
         back: function () {
             self = this;
             dataService.getListadoLimpio().then(function () {
                 self.render();
             });
         },
         beforeSearch: function (event) {
             if (event.which == 13) {
                 this.search();
             } else {
                 this.autocompletar();
             }
         },
         autocompletar: function () {
             var palabra = $('#buscador').val(),
                  self = this;
             if (palabra.length > 0) {
                 $('#buscador').autocomplete({ source: this.arrayShips });
            }
         },
         search: function () {
             var palabra = $('#buscador').val(),
                  self = this;
             var tipo = $("input:checked").val();
             var inputID = $("input:checked").attr('id');
             if (palabra.length > 0) {
                 dataService.getBusqueda(palabra, tipo).then(function () {
                     self.render(inputID, palabra);
                 });
             } else {
                 $('#aviso').remove();
                 $('.texto-buscador').append('<label id="aviso" class="aviso">Debe introducir un texto</label>');
                 $('#buscador').effect("shake");
                 $('#buscador').focus();
             }
         }
     });
     return inicioView;
 });