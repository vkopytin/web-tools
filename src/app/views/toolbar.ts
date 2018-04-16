import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import template = require('../templates/toolbar.mustache');


class ToolBar extends BB.View<any> {
    initialize () {
        console.log('ToolBar: Initialize');
    }
    toHTML() {
        return template(_.extend({
            cid: this.cid
        }));
    }
    render() {
        var html = this.toHTML();

        this.$el.html(html);

        return this;
    }
}

export { ToolBar };
