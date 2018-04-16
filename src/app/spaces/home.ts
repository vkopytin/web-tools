import * as BB from 'backbone';
import { Content } from '../views/content';
import { MainPresenter } from '../presenters/main';


namespace HomeSpace {
    export interface IOptions extends BB.ViewOptions<any> {
        app: BB.Router;
        api: MainPresenter;
    }
}

interface HomeSpace {
    app: BB.Router;
    api: MainPresenter;
}
class HomeSpace extends BB.View<any> {
    constructor(options: HomeSpace.IOptions) {
        super(options);
    }
    initialize(options) {
        this.app = options.app;
        this.api = options.api;
    }
    view() {
        return new Content({
            api: this.api,
            model: this.api.user(),
            playback: this.api.playback()
        });
    }
}

export { HomeSpace };
