import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { MainPresenter } from '../presenters/main';
import template = require('../templates/profile.mustache');


class Profile extends BB.View<any> {
    initialize() {
        console.log('Profile: Initialize');
    }
    close() {
        this.$('.content')
            .toggleClass('right', true);
        _.delay(() => {
            this.remove();
        }, 500);
        return this;
    }
    toHTML() {
        return template(_.extend({
            cid: this.cid
        }));
    }
    render() {
        var html = this.toHTML();

        this.$el.html(html);
        this.$('.content')
            .toggleClass('hidden', false);

        _.delay(() => {
            this.$('.content')
                .toggleClass('left', false);
        });

        return this;
    }
}

export { Profile };
