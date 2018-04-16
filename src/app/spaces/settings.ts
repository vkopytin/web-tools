import * as BB from 'backbone';
import { Settings } from '../views/settings';
import { MainPresenter } from '../presenters/main';

namespace SettingsSpace {
    export interface IOptions extends BB.ViewOptions<any> {
        app: BB.Router;
        api: MainPresenter;
    }
}

interface SettingsSpace {
    app: BB.Router;
    api: MainPresenter;
}
class SettingsSpace extends BB.View<any> {
    constructor(options: SettingsSpace.IOptions) {
        super(options);
    }
    initialize (options) {
        this.app = options.app;
        this.api = options.api;
    }
    view() {
        return new Settings({
            api: this.api,
            model: this.api.user()
        });
    }
}

export { SettingsSpace };
