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
    }
    toHTML() {
        return template(_.extend({
            cid: this.cid,
            user: this.model.toJSON(),
            playback: this.playback.toJSON()
        }));
    }
    render() {
        var html = this.toHTML();

        this.$el.html(html);

        this.toolbar = new ToolBar({
            el: this.$('.top-toolbar')
        }).render();

        return this;
    }
}

export { Content };
