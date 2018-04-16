import * as BB from 'backbone';
import { Favorites } from '../views/favorites';
import { MainPresenter } from '../presenters/main';


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

const FavoritesSpace = BB.View.extend({
    initialize: function (options) {
        this.app = options.app;
        this.api = options.api;
    },
    view: function () {
        return new Favorites({
            api: this.api,
            model: this.api.user()
        });
    }
});

export { FavoritesSpace };
