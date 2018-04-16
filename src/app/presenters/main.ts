import * as BB from 'backbone';

import { SpotifyAPI } from '../spotifyAPI';
import { Playlists } from '../collections/playlists';

class MainPresenter {
    profile: { [id: string]: any }
    _playlists: any
    _tracks: any
    _playback: any;
    _search: any;

    constructor() {
        this._playlists = new BB.Collection();
        this._tracks = new BB.Collection();
        this._playback = new BB.Model();
        this._search = new BB.Collection();
    }

    async login (username, password) {
        var profile = this.profile = await SpotifyAPI.login(username, password);
        return profile;
    }

    async tokenLogin () {
        var profile = this.profile = await SpotifyAPI.tokenLogin();
        return profile;
    }

    user () {
        return new BB.Model(this.profile);
    }

    playlists () {
        var items = this._playlists;
        var fetch = async () => {
            var playlists: { [items: string] : any } = await SpotifyAPI.playlists(this.profile.id);

            items.reset(playlists.items);
        };
        fetch();
        return items;
    }

    tracks (playlistId) {
        var items = this._tracks;
        var user = this._playlists.get(playlistId).get('owner');
        var fetch = async () => {
            var tracks: { [items: string] : any } = await SpotifyAPI.tracks(user.id, playlistId);

            items.reset(tracks.items);
        };
        fetch();
        return items;
    }

    sort(playlistId, rangeStart, insertBefore) {
        var user = this._playlists.get(playlistId).get('owner');
        var put = async () => {
            var tracks: { [items: string] : any } = await SpotifyAPI.sort(user.id, playlistId, rangeStart, insertBefore);
        };
        put();
        return true;
    }

    playback() {
        var fetch = async () => {
            var playback = await SpotifyAPI.player();
            this._playback.set(playback);
        };
        fetch();
        return this._playback;
    }

    playTrack(track) {
        var put = async () => {
            var tracks: { [items: string] : any } = await SpotifyAPI.playTrack([track.uri]);
        };
        put();
        return true;
    }

    play(track, playlistId) {
        var playlist = this._playlists.get(playlistId).toJSON(),
            put = async () => {
            var tracks: { [items: string] : any } = await SpotifyAPI.play(playlist.uri, track.uri);
        };
        put();
        return true;
    }

    search(term?, type?) {
        var fetch = async () => {
            var result : { [items: string] : any }= await SpotifyAPI.search(term, type);

            this._search.reset(result.tracks.items);
        }
        if (term) {
            fetch();
        } else {
            this._search.reset();
        }

        return this._search;
    }
}

export { MainPresenter };
