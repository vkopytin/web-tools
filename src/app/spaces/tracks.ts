import * as BB from 'backbone';
import { Base } from '../views/base';
import { Tracks } from '../views/tracks';
import { MainPresenter } from '../presenters/main';
import { ViewModel } from '../di/ViewModel';


namespace TracksSpace {
    export interface IOptions extends BB.ViewOptions<any> {
        app: BB.Router;
        api: MainPresenter;
    }
}

interface TracksSpace {
    app: BB.Router;
    api: MainPresenter;
    playlistId;
}

class TracksSpace extends ViewModel(Base, { MainPresenter })<BB.Model> {

    view(playlistId) {
        this.playlistId = playlistId;
        return this;
    }
    remove() {
        this.$el.toggleClass('hidden');
        return this;
    }
}

export { TracksSpace };
