import * as BB from 'backbone';
import { Playlists } from '../views/playlists';
import { MainPresenter } from '../presenters/main';


namespace PlaylistsSpace {
    export interface IOptions extends BB.ViewOptions<any> {
        app: BB.Router;
        api: MainPresenter;
    }
}

interface PlaylistsSpace {
    app: BB.Router;
    api: MainPresenter;
}

class PlaylistsSpace extends BB.View<any> {
    constructor(options: PlaylistsSpace.IOptions) {
        super(options);
    }
    initialize(options) {
        this.app = options.app;
        this.api = options.api;
    }
    view() {
        return new Playlists({
            api: this.api,
            collection: this.api.playlists()
        });
    }
}

export { PlaylistsSpace };
