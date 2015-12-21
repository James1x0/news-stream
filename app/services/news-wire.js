import Ember from 'ember';
import ENV from '../config/environment';

const timesApi = ENV.nytimesApi;

export default Ember.Service.extend({
  store: Ember.inject.service(),
  source: 'all', // all, nyt, or iht
  section: 'all', // news section
  time: '24', // hours
  limit: '20', // 0-20 items
  pollEvery: 2000, // milliseconds between polls

  startPoll: Ember.on('init', function () {
    this.set('__nextPoll', Ember.run.next(this, this.__poll));
  }),

  stopPoll () {
    const scheduledPoll = this.get('__nextPoll');

    if ( scheduledPoll ) {
      Ember.run.cancel(scheduledPoll);
    }
  },

  __poll () {
    let apiUrl = timesApi.basePath + this.get('source') + '/';
    apiUrl += this.get('section') + '/' + this.get('time');
    apiUrl += '.json?api-key=' + timesApi.apiKeys.newswire;
    apiUrl += '&limit=' + this.get('limit');

    let currentPoll = Ember.$.getJSON(apiUrl).then(response => {
      this.store.push(this.store.normalize({
        data: response.results.map(result => {
          result.id = result.url;
          result.type = 'news';
          return result;
        })
      }));
    }).fail(err => {
      this.send('pollError', err);
    });

    this.set('__currentPoll', currentPoll);
    Ember.run.later(this, this.__poll, this.get('pollEvery'));
  },

  willDestroy () {
    this._super(...arguments);
    this.stopPoll();
  }
});
