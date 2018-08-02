import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { ToolBar } from './toolbar';
import { MainPresenter } from '../presenters/main';
import { debounce, events } from '../utils/bbUtils';
import template = require('../templates/content.mustache');


namespace Content {
    export interface IOptions extends BB.ViewOptions<any> {
        api: MainPresenter;
        playback: any
    }
}

interface Content {
    playback: any;
    toolbar: ToolBar;
}

class Content extends BB.View<any> {
    constructor(options: Content.IOptions) {
        super(options);
    }
    initialize(options) {
        this.playback = options.playback;
        this.listenTo(this.playback, 'change', this.render);
        this.listenTo(this.model, 'change', this.render);
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
        const data = _.extend({
            cid: this.cid,
            user: this.model.toJSON(),
            playback: this.playback.toJSON()
        });
        return template(data);
    }
    render() {
        var html = this.toHTML();

        this.$el.html(html);
        this.$('.content')
            .toggleClass('hidden', false);

        this.toolbar = new ToolBar({
            el: this.$('.top-toolbar')
        }).render();

        _.delay(() => {
            this.$('.content')
                .toggleClass('left', false);
        });

        return this;
    }
}

export { Content };
