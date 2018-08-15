import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { MainPresenter } from '../presenters/main';
import { SettingsSpace } from '../spaces/settings';

const template = require('../templates/settings');

namespace Settings {
    export interface IOptions extends BB.ViewOptions<any> {
        api: MainPresenter;
    }
}

const Settings = <T extends Constructor<SettingsSpace>>(Base: T) => {
    class Settings$SettingsSpace extends Base {
        views: {
        }
        initialize() {
            this.model = this.viewModel.user();
            console.log('Profile: Initialize');
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
            return template(_.extend({
                cid: this.cid
            }, this.views));
        }
        render() {
            var html = this.toHTML();

            this.$el.html(html);
            this.$('.content')
                .toggleClass('hidden', false);

            _.delay(() => {
                this.$('.content')
                    .toggleClass('left', false);
            });

            return this;
        }
    }
    return Settings$SettingsSpace;
}

export { Settings };
