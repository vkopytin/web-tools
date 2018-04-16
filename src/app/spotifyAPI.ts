import * as $ from 'jquery';
import * as _ from 'underscore';
import * as cookie from 'cookie';

const APP_KEY = '963f916fa62c4186a4b8370e16eef658';
//const APP_KEY = 'cd68cfa0ace62ecda7a1db90a515d7e30dd6976b';

const AUTH_URL = 'https://accounts.spotify.com/authorize';
const AUTH_URL2 = '/login/login';
const PLAYLIST_URL = 'https://api.spotify.com/v1/users/{user_id}/playlists';
const TRACKS_URL = 'https://api.spotify.com/v1/users/{user_id}/playlists/{playlist_id}/tracks';
const USER_TRACKS_URL = 'https://api.spotify.com/v1/me/tracks';
const TRACK_SORT_URL = 'https://api.spotify.com/v1/users/{user_id}/playlists/{playlist_id}/tracks';
const USER_PLAYER_PLAY_URL = 'https://api.spotify.com/v1/me/player/play';
const USER_PLAYER_STATUS_URL = 'https://api.spotify.com/v1/me/player';
const SEARCH_URL = 'https://api.spotify.com/v1/search';

var accessToken;


const SpotifyAPI = {
    login: function (username, password) {
        var accessToken = this.readAccessToken();

        return new Promise((resolve, reject) => {

            if (accessToken) {
                $.ajax({
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    },
                    success: function (response) {
                        resolve(response);
                    },
                    error: function () {
                        this.redirectToLogin(username, password);
                    }
                });
            } else {
                this.redirectToLogin(username, password);
            }
        });
    },
    tokenLogin: function () {
        var accessToken = this.readAccessToken();
        return new Promise((resolve, reject) => {
            if (accessToken) {
                $.ajax({
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    },
                    success: function (response) {
                        resolve(response);
                    },
                    error: function (error) {
                        resolve(false);
                    }
                });
            } else {
                resolve(false);
            }
        });
    },
    redirectToLogin1: function () {
        var loginData = {
            client_id: APP_KEY,
            response_type: 'token',
            redirect_uri: 'http://localhost:3010/login',
            scope: 'streaming user-modify-playback-state user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private user-library-read user-library-modify user-read-playback-state',
            state: +Date()
        };

        window.location.replace([AUTH_URL, $.param(loginData)].join('?'));
    },
    redirectToLogin: function (username, password) {
        var loginData = {
            username: username,
            password: password,
            redirect_uri: 'http://localhost:3010/login'
        };

        window.location.replace([AUTH_URL2, $.param(loginData)].join('?'));
    },
    readAccessToken: function () {
        var cookiesObj = cookie.parse(document.cookie),
            getArgs = window.location.hash.replace(/^#/gi, '').split('&'),
            args: {[key: string]: string} = _.reduce(getArgs, (res, line) => {
                var pair = line.split('=');

                res[$.trim(pair[0])] = $.trim(pair[1]);

                return res;
            }, {});

        if (_.has(cookiesObj, 'wp_access_token')) {
            return accessToken = cookiesObj.wp_access_token;
        }
        
        if (args.access_token) {
            return accessToken = args.access_token;
            //return accessToken = "BQDLurTpA58H76eEe7bE-qpcXzE6SB6FERHDWXKKpB2kT4aehMgdCHl2W2YHSpR3MPllYJ4RlRHK3B944bRyX4Nm9qwcpPc2eZ3eR2lgSUA3JRsDbZ5dCDcJjzEgPlsGY2mneeKsfck21IObrxFtg4qzAugdyqAtL-kfTccVoOOOxRJrokIpFpS9lrMiAhYkFagF_pv7G6f7Gb4Vl7zOSYVwp_rX0RlC69I2iBEU-Jy6VgUmHIkW19pWTeA-md0R37i7gTl-kUc";
        }

        return accessToken;
    },
    search: function (term, type?) {
        var url = SEARCH_URL,
            type = type || 'album,artist,playlist,track';

        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                data: {
                    q: term,
                    type: type
                },
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                success: function (response) {
                    resolve(response);
                }
            });
        });
    },
    playlists: function (userId) {
        var url = PLAYLIST_URL.replace('{user_id}', userId);

        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                success: function (response) {
                    resolve(response);
                }
            });
        });
    },
    tracks: function (userId, playlistId) {
        var url = TRACKS_URL
            .replace('{user_id}', userId)
            .replace('{playlist_id}', playlistId);

        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                success: function (response) {
                    resolve(response);
                }
            });
        });
    },
    sort: function (userId, playlistId, rangeStrat, insertBefore) {
        var url = TRACK_SORT_URL
            .replace('{user_id}', userId)
            .replace('{playlist_id}', playlistId);

        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    range_start: rangeStrat,
                    insert_before: insertBefore
                }),
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                success: function (response) {
                    resolve(response);
                }
            });
        });
    },

    player: function () {
        var url = USER_PLAYER_STATUS_URL;

        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                success: function (response) {
                    resolve(response);
                }
            });
        });
    },
    
    playTrack: function (trackUris) {
        var url = USER_PLAYER_PLAY_URL;

        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    uris: trackUris
                }),
                success: function (response) {
                    resolve(response);
                }
            });
        });
    },

    play: function (playlistUri, index) {
        var url = USER_PLAYER_PLAY_URL;

        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({
                    context_uri: playlistUri,
                    offset: {
                        uri: index
                    }
                }),
                success: function (response) {
                    resolve(response);
                }
            });
        });
    },

    token: function () {
        var url = 'https://gew-spclient.spotify.com/melody/v1/license_url?keysystem=com.widevine.alpha&mediatype=audio';

        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                success: function (response) {
                    resolve(response);
                }
            });
        });
    }
};

export { SpotifyAPI }
