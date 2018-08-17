import * as BB from 'backbone';
import { Base } from '../views/base';
import { Playlists } from '../views/playlists';
import { MainPresenter } from '../presenters/main';
import { ViewModel } from '../di/ViewModel';


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
