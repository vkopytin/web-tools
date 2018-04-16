import * as BB from 'backbone';
import { Content } from '../views/content';

const HomeSpace = BB.View.extend({
    initialize: function (options) {
        this.app = options.app;
        this.api = options.api;
    },
    view: function () {
        return new Content({
            api: this.api,
            model: this.api.user(),
            playback: this.api.playback()
        });
    }
});

export { HomeSpace };
