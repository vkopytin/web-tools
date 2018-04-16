import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { MainPresenter } from '../presenters/main';
import template = require('../templates/playlistItem.mustache');


namespace PlaylistItem {
    export interface IOptions extends BB.ViewOptions<any> {
        api: MainPresenter;
    }
}

class PlaylistItem extends BB.View<any> {
    constructor(options: PlaylistItem.IOptions) {
        super(options);
    }
    toHTML() {
        return template(_.extend({
            cid: this.cid
        }, this.model.toJSON()));
    }
    render() {
        var html = this.toHTML();

        this.$el.html(html);

        return this;
    }
}

export { PlaylistItem };
