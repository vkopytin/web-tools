import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { HomeSpace } from '../spaces/home';
import { ToolBar } from './toolbar';
import { MainPresenter } from '../presenters/main';
import template = require('../templates/content.mustache');
import { setCookie } from '../utils/cookie';
import { events } from '../utils/bbUtils';


namespace Home$HomeSpace {
    export interface IOptions extends BB.ViewOptions<any> {
        api: MainPresenter;
        playback: any
    }
}


const Home = <T extends Constructor<HomeSpace>>(Base: T) => {
    interface Home$HomeSpace {
        api: MainPresenter;
        playback: any;
        toolbar: ToolBar;
    }
    @events({
        'mouseenter #player': 'showControls',
        'mouseleave #player': 'showControls',
        'click .play': 'playSong',
        'click .pause': 'pauseSong'
    })
    class Home$HomeSpace extends Base {
        initialize(options: Home$HomeSpace.IOptions) {
            this.api = this.viewModel;
            this.model = this.viewModel.user();
            this.playback = this.viewModel.playback();
            this.listenTo(this.playback, 'change', this.render);
            this.listenTo(this.model, 'change:devices', this.updateDevice);
            this.listenTo(this.model, 'change', this.render);
        }
        updateDevice() {
            const device = _.last(this.model.get('devices')) as { id: string };
            setCookie('device_id', device.id, 90);
        }
        showControls() {
            this.$('.info').toggleClass('up');
        }
        playSong() {
            this.$('.play').toggleClass('hidden', true);
            this.$('.pause').toggleClass('hidden', false);
        }
        pauseSong() {
            this.$('.play').toggleClass('hidden', false);
            this.$('.pause').toggleClass('hidden', true);
        }
        view() {
            this.viewModel.playback();
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
    return Home$HomeSpace;
}

export { Home };
