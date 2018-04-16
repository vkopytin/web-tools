import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';

const template = require('../templates/playlistItem');

const PlaylistItem = BB.View.extend({
    views: {
    },
    toHTML: function () {
        return template(_.extend({
            cid: this.cid
        }, this.model.toJSON()));
    },
    render: function () {
        var html = this.toHTML();

        this.$el.html(html);

        return this;
    }
});

export { PlaylistItem };
