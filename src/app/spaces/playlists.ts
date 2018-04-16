import * as BB from 'backbone';
import { Playlists } from '../views/playlists';

const PlaylistsSpace = BB.View.extend({
    initialize: function (options) {
        this.app = options.app;
        this.api = options.api;
    },
    view: function () {
        return new Playlists({
            api: this.api,
            collection: this.api.playlists()
        });
    }
});

export { PlaylistsSpace };
