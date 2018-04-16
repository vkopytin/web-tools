import * as BB from 'backbone';

const Playlists = BB.Collection.extend({
    parse: function (data) {
        return data.items;
    }
});

export { Playlists };
