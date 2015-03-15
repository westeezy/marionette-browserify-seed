var plugins = require('./plugins'),
  	$ = require('jquery'),
  	Backbone = require('backbone'),
  	ModalService = require('common/modals/modalService'),
  	HeaderService = require('./modules/header/HeaderService'),
  	FooterService = require('./modules/footer/FooterService'),
  	IndexRouter = require('./modules/home/router'),
  	ApplicationsRouter = require('./modules/inProgress/ApplicationsRouter'),
  	EnrollRouter = require('./modules/enroll/EnrollRouter'),
  	App = require('./application/application');



$.when.apply(null, plugins).then(function() {
  var app = new App();

  app.header = new HeaderService({
    container: app.layout.header
  });

  app.footer = new FooterService({
    container: app.layout.footer
  });

  app.modal = new ModalService({
    container: app.layout.overlay
  });

  app.inProgress = new ApplicationsRouter({
    container: app.layout.content
  });

  app.enroll = new EnrollRouter({
    container: app.layout.content
  });

  app.index = new IndexRouter({
    container: app.layout.content
  });

  Backbone.history.start();
});
