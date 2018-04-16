import * as BB from 'backbone';
import { Tracks } from '../views/tracks';
import { MainPresenter } from '../presenters/main';


namespace TracksSpace {
    export interface IOptions extends BB.ViewOptions<any> {
        app: BB.Router;
        api: MainPresenter;
    }
}

interface TracksSpace {
    app: BB.Router;
    api: MainPresenter;
}

class TracksSpace extends BB.View<any> {
    constructor(options: TracksSpace.IOptions) {
        super(options);
    }
    initialize(options) {
        this.app = options.app;
        this.api = options.api;
    }
    view(playlistId) {
        return new Tracks({
            api: this.api,
            playlistId: playlistId,
            collection: this.api.tracks(playlistId)
        });
    }
}

export { TracksSpace };
