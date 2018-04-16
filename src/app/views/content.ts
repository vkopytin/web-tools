import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { ToolBar } from './toolbar';

const template = require('../templates/content');

const Content = BB.View.extend({
    views: {
    },
    initialize: function (options) {
        this.playback = options.playback;
        this.listenTo(this.playback, 'change', this.render);
    },
    toHTML: function () {
        return template(_.extend({
            cid: this.cid,
            user: this.model.toJSON(),
            playback: this.playback.toJSON()
        }));
    },
    render: function () {
        var html = this.toHTML();

        this.$el.html(html);

        this.toolbar = new ToolBar({
            el: this.$('.top-toolbar')
        }).render();

        return this;
    }
});

export { Content };
