import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { PlaylistItem } from './playlistItem';
import { MainPresenter } from '../presenters/main';
import { debounce, events } from '../utils/bbUtils';
const template = require('../templates/playlists');


namespace Playlists {
    export interface IOptions extends BB.ViewOptions<any> {
        api: MainPresenter;
    }
}
interface Playlists {
    api: MainPresenter;
}
class Playlists extends BB.View<any> {
    constructor(options: Playlists.IOptions) {
        super(options);
    }
    initialize(options) {
        this.api = options.api;
        this.listenTo(this.collection, 'add', this.drawItem);
        this.listenTo(this.collection, 'reset', this.drawItems);
    }
    drawItem(model) {
        var view = new PlaylistItem({
            tagName: 'li',
            className: 'table-view-cell media',
            model: model,
            api: this.api
        });
        this.$('.playlist-items').append(view.$el);
        view.render();
    }
    drawItems() {
        this.$('.playlist-items').empty();
        this.collection.each(this.drawItem, this);
    }
    toHTML() {
        return template(_.extend({
            cid: this.cid
        }));
    }
    render() {
        var html = this.toHTML();

        this.$el.html(html);

        this.drawItems();

        return this;
    }
}

export { Playlists };
