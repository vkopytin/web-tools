import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';

import { PlaylistItem } from './playlistItem';

const template = require('../templates/playlists');

const Playlists = BB.View.extend({
    views: {
    },
    initialize: function () {
        this.listenTo(this.collection, 'add', this.drawItem);
        this.listenTo(this.collection, 'reset', this.drawItems);
    },
    drawItem: function (model) {
        var view = new PlaylistItem({
            tagName: 'li',
            className: 'table-view-cell media',
            model: model
        });
        this.$('.playlist-items').append(view.$el);
        view.render();
    },
    drawItems: function () {
        this.$('.playlist-items').empty();
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

        return this;
    }
});

export { Playlists };
