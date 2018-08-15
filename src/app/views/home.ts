import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { HomeSpace } from '../spaces/home';
import { ToolBar } from './toolbar';
import { MainPresenter } from '../presenters/main';
import template = require('../templates/content.mustache');


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
    class Home$HomeSpace extends Base {
        initialize(options: Home$HomeSpace.IOptions) {
            this.api = this.viewModel;
            this.model = this.viewModel.user();
            this.playback = this.viewModel.playback();
            this.listenTo(this.playback, 'change', this.render);
            this.listenTo(this.model, 'change', this.render);
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
