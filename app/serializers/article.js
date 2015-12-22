import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalize ( type, hash ) {
    hash.id = hash.url;
    hash.publishedDate = hash.published_date;

    return this._super(...arguments);
  },

  pushPayload () {
    return this._super(...arguments);
  }
});
