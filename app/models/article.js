import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  url:   DS.attr(),
  publishedDate: DS.attr('date'),
  thumbnailUrl: DS.attr()


});
