import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import 'jquery-ui/ui/widgets/mouse';
import '../tools/touch-punch';
import 'jquery-ui/ui/widgets/sortable';

import { TrackItem } from './trackItem';

const template = require('../templates/tracks');

const Tracks = BB.View.extend({
    items: [],
    events: {
        'sortstart .track-items': 'sortStart'
    },
    initialize: function (options) {
        this.items = [];
        this.playlistId = options.playlistId;
        this.api = options.api;

        this.listenTo(this.collection, 'add', this.drawItem);
        this.listenTo(this.collection, 'reset', this.drawItems);
    },
    sortStart: function (evnt, ui) {
        var rangeStart = this.$('.track-items li').index(ui.item);
        this.$('.track-items').one('sortstop', (evnt, ui) => {
            var insertBefore = this.$('.track-items li').index(ui.item);
            this.api.sort(this.playlistId, rangeStart, insertBefore);
        });
    },
    drawItem: function (model) {
        var view = new TrackItem({
            tagName: 'li',
            className: 'table-view-cell media',
            model: model,
            api: this.api,
            audio: this.$('audio'),
            playlistId: this.playlistId
        });
        this.$('.track-items').append(view.$el);
        view.render();
        this.items.push(view);
    },
    drawItems: function () {
        this.$('.track-items').empty();
        this.collection.each(this.drawItem, this);
    },
    toHTML: function () {
        return template(_.extend({
            cid: this.cid
        }, this.views));
    },
    render: function () {
        var html = this.toHTML();

        this.$el.html(html);

        this.drawItems();

        this.$('.track-items').sortable({
            handle: '.drag-handler'
        });

        return this;
    }
});

export { Tracks };
