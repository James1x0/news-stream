import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [
      {title: "cool thing"},
      {title: "another whammy"}
    ]
    }
});
