import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { MainPresenter } from '../presenters/main';
import template = require('../templates/profile.mustache');


namespace Profile {
    export interface IOptions extends BB.ViewOptions<any> {
        api: MainPresenter;
    }
}

class Profile extends BB.View<any> {
    constructor(options: Profile.IOptions) {
        super(options);
    }
    initialize() {
        console.log('Profile: Initialize');
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

export { Profile };
