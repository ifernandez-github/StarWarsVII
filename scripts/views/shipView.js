define(['jquery',
        'underscore',
        'backbone',
        'routers/router',
        'components/dataService',
        'text!templates/shipDetail.html',
        'jquery-ui'],
    function ($, _, Backbone, Router, DataService, shipDetailTemplate) {
    
     var shipView = Backbone.View.extend({
        //template: _.template($('#detalle-template').html()),
        template: _.template(shipDetailTemplate),
        tagName: 'li',
        className: 'liShip',
        render: function () {
            this.$el.html( this.template(this.model.toJSON()));
            return this;
        },
        events: {
            'click [name=deleteShip]': 'deleteShip'
        },
        deleteShip: function () {
            if (confirm('¿Está seguro de borrar esta nave?')) {
                app.ships.remove(this.model);
                DataService.deleteShip(this.model).then(function () {
                    Router.navigate('#/', { trigger: true });
                });
            }
        }
    });
    return shipView;
});