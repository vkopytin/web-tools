import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';

import template = require('../templates/main.mustache');

const MainView = BB.View.extend({
    initialize: function () {
    },
    render: function () {
        this.$el.html(template());

        return this;
    }
});

export { MainView };
