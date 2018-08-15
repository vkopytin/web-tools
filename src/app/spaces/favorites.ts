import * as BB from 'backbone';
import { Base } from '../views/base';
import { Favorites } from '../views/favorites';
import { MainPresenter } from '../presenters/main';
import { ViewModel } from '../di/ViewModel';


namespace FavoritesSpace {
    export interface IOptions extends BB.ViewOptions<any> {
        app: BB.Router;
        api: MainPresenter;
    }
}

interface FavoritesSpace {
    app: BB.Router;
    api: MainPresenter;
}

class FavoritesSpace extends ViewModel(Base, { MainPresenter })<BB.Model> {
    view() {
        return this;
    }
}

export { FavoritesSpace };
