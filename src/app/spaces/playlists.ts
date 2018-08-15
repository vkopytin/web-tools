import * as BB from 'backbone';
import { Base } from '../views/base';
import { Playlists } from '../views/playlists';
import { MainPresenter } from '../presenters/main';
import { ViewModel } from '../di/ViewModel';


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

class PlaylistsSpace extends ViewModel(Base, { MainPresenter })<BB.Model> {
    view() {
        return this;
    }
    remove() {
        this.$el.toggleClass('hidden');
        return this;
    }
}

export { PlaylistsSpace };
