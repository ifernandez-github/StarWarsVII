requirejs.config({
    findNestedDependencies: true,
    //By default load any module IDs from scripts/lib
    baseUrl: 'scripts/lib',
    paths: {
        jquery: 'kendo/js/jquery.min',
        models: '../models',
        collections: '../collections',
        views: '../views',
        routers: '../routers',
        components: '../components',
        modalDialog: 'backbone.ModalDialog',
        templates: '../templates',
        text: 'requirejs-text/text',
        kendo: 'kendo.all'
    },
   /* maps: {
        '*': {
        'kendo.all.min': '../lib/kendo/js/kendo.all.min'
             }
         },*/
    //shim es usado para cargar librerías que no soportan AMD (carga de módulos de forma asíncrona) y hay que controlar sus dependencias, así como su exportación e iniciación. 
    //jQuery, Backbone.js y Underscore.js se cargan de forma sincrónica y también dependen uno de otros, así que necesitaremos pasarlos como parámetros.
    shim: {
        'jquery': {
            exports: 'jquery'
        },
        'jquery-ui': {
            deps: ['jquery'],
            exports: 'JqueryUI'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'kendo': {
            deps: ['jquery'],
            exports: "kendo"
        }

        /*"kendo/kendo.core": {
            deps: ["jQuery"],
            exports: "kendo"
        }*/
    }
});
var app = app || {};
require(['routers/router', 'components/dataService'], function (router, dataService) {
    $(document).ready(function () {
       dataService.getData().then(function () {
            router.start();
        });
    });
});;