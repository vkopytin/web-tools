import * as BB from 'backbone';
import { Tracks } from '../views/tracks';

const TracksSpace = BB.View.extend({
    initialize: function (options) {
        this.app = options.app;
        this.api = options.api;
    },
    view: function (playlistId) {
        return new Tracks({
            api: this.api,
            playlistId: playlistId,
            collection: this.api.tracks(playlistId)
        });
    }
});

export { TracksSpace };
