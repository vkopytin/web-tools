import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { Format } from '../utils/format';
import { TrackItem } from './trackItem';

const template = require('../templates/search');

const Search = BB.View.extend({
    events: {
        'input .search-term': 'search'
    },
    initialize: function (options) {
        this.api = options.api;
        this.listenTo(this.collection, 'reset', this.drawItems);
    },
    search: _.debounce(function (evnt) {
        var value = this.$('.search-term').val();
        this.$el.trigger('loading');
        this.api.search(value);
    }, 500),
    toHTML: function () {
        return template(_.extend({
            cid: this.cid,
            searchTerm: this.$('.search-term').val(),
            result: { items: this.collection.toJSON() },
            duration: function () {
                return Format.duration(this.duration_ms / 1000);
            }
        }));
    },
    drawItem: function (model) {
        var view = new TrackItem({
            tagName: 'li',
            className: 'table-view-cell media',
            model: model,
            api: this.api
        });
        this.$('ul').append(view.$el);
        view.render();
    },
    drawItems: function () {
        this.$('ul').empty();
        this.collection.each(this.drawItem, this);
        this.$el.trigger('loaded');
    },
    render: function () {
        var html = this.toHTML();

        this.$el.html(html);
        this.$('.search-term').focus();

        return this;
    }
});

export { Search };
