PAGES = [
  {
    id: "1",
    title: "Angular 1",
    route: "tutorials.angular1",
    path: "/tutorials/angular1",
    pathRedirect: "/tutorials/angular1/bootstrapping",
    ghRepoName: "https://github.com/Urigo/meteor-angular-socially",
    subSidebarType: "sidebarStepsCollapse",
    seoTitlePrefix: "Angular Meteor Tutorial | ",
    subHead: "Build your first Angular Meteor app",
    stepbarHide: true,
    pages: ANGULAR1_TUT
  },
  {
    id: "2",
    title: "Angular 2",
    route: "tutorials.angular2",
    path: "/tutorials/angular2",
    pathRedirect: "/tutorials/angular2/bootstrapping",
    ghRepoName: "https://github.com/ShMcK/ng2-socially-tutorial",
    subSidebarType: "sidebarStepsCollapse",
    seoTitlePrefix: "Angular 2.0 Meteor Tutorial | ",
    subHead: "Angular 2.0 Meteor tutorial",
    stepbarHide: true,
    pages: ANGULAR2_TUT
  },
  {
    id: "3",
    title: "Ionic",
    route: "tutorials.ionic",
    path: "/tutorials/ionic",
    pathRedirect: "/tutorials/ionic/bootstrapping",
    ghRepoName: "https://github.com/idanwe/ionic-cli-meteor-whatsapp-tutorial",
    seoTitlePrefix: "Angular-Meteor and Ionic | ",
    subHead: "Angular-Meteor and Ionic",
    stepbarHide: true,
    pages: IONIC_TUT
  }
];

Template.sidebarDesktop.helpers({
  sidebarType: function() {
    return this.subSidebarType ? this.subSidebarType : "sidebarDefault";
  }
});

Template.tutorialSelector.helpers({
  tutorialLink: function() {
    var route = Router.current().route.path(this) || 'angular';

    if (route.indexOf('tutorials/ionic') !== -1) {
      return 'ionic-tutorial';
    }
    else {
      return 'tutorialIntro';
    }
  },
  pages: function() {
    var route = Router.current().route.path(this) || 'angular';

    if (route.indexOf('tutorials/ionic') !== -1) {
      return [];
    }
    else {
      return [PAGES[0], PAGES[1]];
    }
  }
});

Template.tutorialSelector.helpers({
  selected: function() {
    var self = this;
    var rData = Router.current().data();
    return rData.route == self.route || rData.parent.route == self.route ? "active" : "";
  }
});

Template.sidebarDefault.helpers({
  pages: function() {
    var route = Router.current().route.path(this) || 'angular';

    if (route.indexOf('tutorials/ionic') !== -1) {
      return IONIC_TUT;
    }
    else {
      return ANGULAR1_TUT;
    }
  }
});

Template.sidebarDefault.helpers({
  index: function () {
    return Number(this.id);
  }
});

Template.sidebarMobile.helpers({
  selectedMobile: function () {
    return Router.current().data().route == this.route ? {selected: ""} : null;
  }
});
Template.sidebarMobile.events({
  "change .component-sidebar-mobile": function(event, template){
    $(event.currentTarget).blur();
    var dest = $(event.target).val();
    if(dest) {
      window.location = dest;
    }
  }
});

Template.sidebarLink.helpers({
  selected: function() {
    var self = this;
    var rData = Router.current().data();
    var chapter = rData.path.substr(rData.path.lastIndexOf('/'));
    var routeChapter = self.path.substr(self.path.lastIndexOf('/'));
    return chapter == routeChapter ? "active" : "";
  },
  sidebarPath: function() {
    var rData = Router.current().data();
    var parent = rData.path.substr(0, rData.path.lastIndexOf('/'));
    var chapter = this.path.substr(this.path.lastIndexOf('/'));
    return parent + chapter;
  }
});

Template.tutorialsLink.helpers({
  selected: function() {
    var self = this;
    var rData = Router.current().data();
    if(this.subSidebarType === "sidebarStepsCollapse") {
      var childElem = '.' + this.id + '-steps';
      if(rData.route == self.route || rData.parent.route == self.route) {
        $(childElem).collapse('show');
      } else {
        $(childElem).collapse('hide');
      }
    }
    return rData.route == self.route || rData.parent.route == self.route ? "active" : "";
  },
  chapter: function () {
    if (Router.current().data) {
      var rData = Router.current().data();
      return rData.path.substr(rData.path.lastIndexOf('/'));
    }
    else {
      return [];
    }
  }
});

Template.sidebarStepsCollapse.onRendered(function() {
  var self = this;
  var rData = Router.current().data();
  var childElem = '.' + self.data.id + '-steps';
  $('.collapse').collapse({toggle: false});
  if(rData.route == self.data.route || rData.parent.route == self.data.route) {
    $(childElem).collapse('show');
  } else {
    $(childElem).collapse('hide');
  }
});
