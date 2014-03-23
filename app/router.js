var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route('component-test');
  this.route('helper-test');
  this.route('player',{ path: '/video/:video_id' });
  // this.resource('posts', function() {
  //   this.route('new');
  // });
});

export default Router;
