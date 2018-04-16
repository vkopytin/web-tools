import * as BB from 'backbone';

import { Settings } from '../views/settings';

const SettingsSpace = BB.View.extend({
    initialize: function (options) {
        this.app = options.app;
        this.api = options.api;
    },
    view: function () {
        return new Settings({
            api: this.api,
            model: this.api.user()
        });
    }
});

export { SettingsSpace };
