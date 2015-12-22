import Ember from 'ember';

export default Ember.Controller.extend({
  newswire: Ember.inject.service('news-wire'),

  bootNewswire: Ember.on('init', function () {
    this.get('newswire');
  })
});
