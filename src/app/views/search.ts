import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { Format } from '../utils/format';
import { TrackItem } from './trackItem';
import { MainPresenter } from '../presenters/main';
import { debounce, events } from '../utils/bbUtils';
const template = require('../templates/search');



namespace Search {
    export interface IOptions extends BB.ViewOptions<any> {
        api: MainPresenter;
    }
}
@events({
    'input .search-term': 'search'
})
class Search extends BB.View<any> {
    constructor(options: Search.IOptions) {
        super(options);
    }
    api: MainPresenter;
    items = [];
    initialize(options) {
        this.api = options.api;
        this.listenTo(this.collection, 'reset', this.drawItems);
    }
    @debounce(500)
    search (evnt) {
        var value = this.$('.search-term').val();
        this.$el.trigger('loading');
        this.api.search(value);
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
            cid: this.cid,
            searchTerm: this.$('.search-term').val(),
            result: { items: this.collection.toJSON() },
            duration: function () {
                return Format.duration(this.duration_ms / 1000);
            }
        }));
    }
    drawItem(model) {
        var value = '' + this.$('.search-term').val(),
            view = new TrackItem({
                tagName: 'li',
                className: 'table-view-cell media',
                model: model,
                api: this.api,
                searchUri: 'spotify:list:search:' + encodeURIComponent(value)
            });
        this.$('ul').append(view.$el);
        view.render();
        this.items.push(view);
    }
    drawItems() {
        const items = [].slice.call(this.items, 0);
        _.defer(() => _.invoke(items, 'remove'));
        this.items = [];
        this.collection.each(this.drawItem, this);
        this.$el.trigger('loaded');
    }
    render() {
        var html = this.toHTML();

        this.$el.html(html);
        this.$('.content')
            .toggleClass('hidden', false);

        this.$('.search-term').focus();

        _.delay(() => {
            this.$('.content')
                .toggleClass('left', false);
        });

        return this;
    }
}

export { Search };
