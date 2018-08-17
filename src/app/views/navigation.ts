import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { MainPresenter } from '../presenters/main';
import template = require('../templates/navigation.mustache');


namespace Navigation {
    export interface IOptions extends BB.ViewOptions<any> {
    }
}
class Navigation extends BB.View<any> {
    constructor(options: Navigation.IOptions) {
        super(options);
    }
    views: {
    }
    initialize() {
        console.log('ToolBar: Initialize');
    }
    setActive(name) {
        this.$('.tab-item').toggleClass('active', false);
        this.$('.' + name).toggleClass('active', true);
    }
    toHTML() {
        return template(_.extend({
            cid: this.cid
        }, this.views));
    }
    render() {
        var html = this.toHTML();

        this.$el.html(html);

        return this;
    }
}

export { Navigation };
