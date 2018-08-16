import * as BB from 'backbone';
import * as _ from 'underscore';

import { SpotifyAPI } from '../spotifyAPI';
import { Playlists } from '../collections/playlists';

class MainPresenter {
    profile: { [id: string]: any }
    _profile = new BB.Model();
    _playlists = new BB.Collection();
    _tracks = new BB.Collection();
    _playback = new BB.Model();
    _search = new BB.Collection();

    constructor() {
    }

    async login (username, password) {
        var profile = this.profile = await SpotifyAPI.login(username, password);
        this._profile.set(profile);
        var devices = await SpotifyAPI.devices();
        this._profile.set(devices);
        //toDO: refactor this
        this.playback();

        return !!profile;
    }

    async tokenLogin () {
        var profile = this.profile = await SpotifyAPI.tokenLogin();
        if (profile) {
            this._profile.set(profile);
            var devices = await SpotifyAPI.devices();
            this._profile.set(devices);
        }

        return !!profile;
    }

    user () {
        return this._profile;
    }

    playlists () {
        var items = this._playlists;
        var fetch = async () => {
            var playlists: { [items: string] : any } = await SpotifyAPI.playlists(this._profile.id);

            items.reset(playlists.items);
        };
        fetch();
        return items;
    }

    tracks (playlistId) {
        var items = this._tracks;
        if (playlistId && this._playlists.length > 0) {
            var user = this._playlists.get(playlistId).get('owner');
            var fetch = async () => {
                var tracks: { [items: string]: any } = await SpotifyAPI.tracks(user.id, playlistId);

                items.reset(tracks.items);
            };
            fetch();
        }    
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

    playTracks(tracksList, offset) {
        var put = async () => {
            var tracks: { [items: string] : any } = await SpotifyAPI.playTracks(_.pluck(tracksList, 'uri'), offset);
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

    pause() {
        var put = async () => {
            await SpotifyAPI.pause();
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
