import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import 'jquery-ui/ui/widgets/mouse';
import '../tools/touch-punch';
import 'jquery-ui/ui/widgets/sortable';
import { TrackItem } from './trackItem';
import { MainPresenter } from '../presenters/main';
import { events } from '../utils/bbUtils';
import { TracksSpace } from '../spaces/tracks';
import template = require('../templates/tracks.mustache');


const Tracks = <T extends Constructor<TracksSpace>>(Base: T) => {
    @events({
        'sortstart .track-items': 'sortStart'
    })
    class Tracks$TracksSpace extends Base {
        items = [];
        initialize(options) {
            this.items = [];
            this.collection = this.viewModel.tracks('');

            this.listenTo(this.collection, 'add', this.drawItem);
            this.listenTo(this.collection, 'reset', this.drawItems);
        }
        view(playlistId) {
            this.playlistId = playlistId;
            this.viewModel.tracks(playlistId);
            return this;
        }
        sortStart(evnt, ui) {
            var rangeStart = this.$('.track-items li').index(ui.item);
            this.$('.track-items').one('sortstop', (evnt, ui) => {
                var insertBefore = this.$('.track-items li').index(ui.item);
                this.viewModel.sort(this.playlistId, rangeStart, insertBefore);
            });
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
            var view = new TrackItem({
                tagName: 'li',
                className: 'table-view-cell media',
                model: model,
                api: this.viewModel,
                playlistId: this.playlistId
            });
            this.$('.track-items').append(view.$el);
            view.render();
            this.items.push(view);
        }
        drawItems() {
            const items = [].slice.call(this.items, 0);
            _.defer(() => _.invoke(items, 'remove'));
            this.items = [];
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

            this.$('.track-items').sortable({
                handle: '.drag-handler'
            });

            _.delay(() => {
                this.$('.content')
                    .toggleClass('left', false);
            });

            return this;
        }
    }
    return Tracks$TracksSpace;
}

export { Tracks };
