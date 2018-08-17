import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { PlaylistItem } from './playlistItem';
import { MainPresenter } from '../presenters/main';
import { PlaylistsSpace } from '../spaces/playlists';
const template = require('../templates/playlists');


namespace Playlists {
    export interface IOptions extends BB.ViewOptions<any> {
        api: MainPresenter;
    }
}
interface Playlists {
    api: MainPresenter;
}

const Playlists = <T extends Constructor<PlaylistsSpace>>(Base: T) => {
    class Playlists$PlaylistsSpace extends Base {
        initialize(options) {
            this.collection = this.viewModel.playlists();
            this.listenTo(this.collection, 'add', this.drawItem);
            this.listenTo(this.collection, 'reset', this.drawItems);
        }
        view() {
            this.viewModel.playlists();
            return this;
        }
        close() {
            this.$('.content')
                .toggleClass('right', true);
            _.delay(() => {
                this.remove();
            }, 500);
            return this;
        }
        drawItem(model) {
            var view = new PlaylistItem({
                tagName: 'li',
                className: 'table-view-cell media',
                model: model
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
            this.$('.content')
                .toggleClass('hidden', false);

            this.drawItems();

            _.delay(() => {
                this.$('.content')
                    .toggleClass('left', false);
            });

            return this;
        }
    }
    return Playlists$PlaylistsSpace;
}

export { Playlists };
