var CollectionView = require('common/collectionview'),
	ItemView = require('./ApplicationsStatusView');

module.exports = CollectionView.extend({
  className: 'list-group',
  childView: ItemView,
});