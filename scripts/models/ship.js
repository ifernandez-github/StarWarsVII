define(['backbone', 'jquery','jquery-ui'], function (Backbone, $) {
    var ship = Backbone.Model.extend({
        url: function () {
            return 'https://localhost:44378/api/shipbyid?' + this.get('id');
        },
        defaults: {
            shipName: '',
            power: 0
        },
        idAttribute: 'idShip'
        /*validate: function (attrs, options) {
            if (attrs.razonSocial.length == 0) {
                $('#txtRazonSocial').effect("shake");
                return "El campo Razón Social es obligatorio.";
            }
            if (attrs.cif.length != 9) {
                $('#txtCif').effect("shake");
                return "El cif es incorrecto (No tiene 9 dígitos o está vacío).";
            }
            if (attrs.telefono.length > 0 && attrs.telefono.length != 9) {
                $('#txtTelefono').effect("shake");
                return "El teléfono es incorrecto.";
            }
        }*/
    });
    return ship;
});