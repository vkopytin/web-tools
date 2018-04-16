import * as BB from 'backbone';
import { Favorites } from '../views/favorites';

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
