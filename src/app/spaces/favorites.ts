import * as BB from 'backbone';
import { Base } from '../views/base';
import { Favorites } from '../views/favorites';
import { MainPresenter } from '../presenters/main';
import { ViewModel } from '../di/ViewModel';


class FavoritesSpace extends ViewModel(Base, { MainPresenter })<BB.Model> {
    view() {
        return this;
    }
}

export { FavoritesSpace };
