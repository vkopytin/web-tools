import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';

const template = require('../templates/settings');

const Settings = BB.View.extend({
    views: {
    },
    initialize: function () {
        console.log('Profile: Initialize');
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

export { Settings };
