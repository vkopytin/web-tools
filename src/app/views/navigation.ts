import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';

const template = require('../templates/navigation');

const Navigation = BB.View.extend({
    views: {
    },
    initialize: function () {
        console.log('ToolBar: Initialize');
    },
    setActive: function (name) {
        this.$('.tab-item').toggleClass('active', false);
        this.$('.' + name).toggleClass('active', true);
    },
    toHTML: function () {
        return template(_.extend({
            cid: this.cid
        }, this.views));
    },
    render: function () {
        var html = this.toHTML();

        this.$el.html(html);

        return this;
    }
});

export { Navigation };
