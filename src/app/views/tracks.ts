import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import 'jquery-ui/ui/widgets/mouse';
import '../tools/touch-punch';
import 'jquery-ui/ui/widgets/sortable';
import { TrackItem } from './trackItem';
import { MainPresenter } from '../presenters/main';
import { events } from '../utils/bbUtils';
import template = require('../templates/tracks.mustache');


namespace Tracks {
    export interface IOptions extends BB.ViewOptions<any> {
        api: MainPresenter;
        playlistId: string;
    }
}

interface Tracks {
    api: MainPresenter;
    playlistId: string;
}

@events({
    'sortstart .track-items': 'sortStart'
})
class Tracks extends BB.View<any> {
    constructor(options: Tracks.IOptions) {
        super(options);
    }
    items = [];
    initialize(options) {
        this.items = [];
        this.playlistId = options.playlistId;
        this.api = options.api;

        this.listenTo(this.collection, 'add', this.drawItem);
        this.listenTo(this.collection, 'reset', this.drawItems);
    }
    sortStart(evnt, ui) {
        var rangeStart = this.$('.track-items li').index(ui.item);
        this.$('.track-items').one('sortstop', (evnt, ui) => {
            var insertBefore = this.$('.track-items li').index(ui.item);
            this.api.sort(this.playlistId, rangeStart, insertBefore);
        });
    }
    drawItem(model) {
        var view = new TrackItem({
            tagName: 'li',
            className: 'table-view-cell media',
            model: model,
            api: this.api,
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

        this.drawItems();

        this.$('.track-items').sortable({
            handle: '.drag-handler'
        });

        return this;
    }
}

export { Tracks };
