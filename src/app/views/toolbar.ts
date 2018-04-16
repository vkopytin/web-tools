import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';

const template = require('../templates/toolbar');

const ToolBar = BB.View.extend({
    views: {
    },
    initialize: function () {
        console.log('ToolBar: Initialize');
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

export { ToolBar };
