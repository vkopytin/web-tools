import * as BB from 'backbone';
import { Base } from '../views/base';
import { Tracks } from '../views/tracks';
import { MainPresenter } from '../presenters/main';
import { ViewModel } from '../di/ViewModel';


class TracksSpace extends ViewModel(Base, { MainPresenter })<BB.Model> {
    playlistId = '';
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
