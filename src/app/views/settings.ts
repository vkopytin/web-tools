import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { MainPresenter } from '../presenters/main';

const template = require('../templates/settings');

namespace Settings {
    export interface IOptions extends BB.ViewOptions<any> {
        api: MainPresenter;
    }
}
class Settings extends BB.View<any> {
    constructor(options: Settings.IOptions) {
        super(options);
    }
    views: {
    }
    initialize() {
        console.log('Profile: Initialize');
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

export { Settings };
