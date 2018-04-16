import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { Format } from '../utils/format';
import { SpotifyAPI } from '../spotifyAPI';
import * as utils from '../utils';

const template = require('../templates/trackItem');

const psshBox = new Uint8Array([
 0,
 0,
 0,
 83,
 112,
 115,
 115,
 104,
 0,
 0,
 0,
 0,
 237,
 239,
 139,
 169,
 121,
 214,
 74,
 206,
 163,
 200,
 39,
 220,
 213,
 29,
 33,
 237,
 0,
 0,
 0,
 51,
 8,
 1,
 18,
 16,
 92,
 151,
 120,
 194,
 253,
 24,
 201,
 80,
 147,
 41,
 55,
 195,
 243,
 99,
 241,
 163,
 26,
 7,
 115,
 112,
 111,
 116,
 105,
 102,
 121,
 34,
 20,
 92,
 151,
 120,
 194,
 253,
 24,
 201,
 80,
 147,
 41,
 55,
 195,
 243,
 99,
 241,
 163,
 50,
 135,
 11,
 94])
const licenseServer = "https://@webgate/widevine-license";

async function requestLicense(message, url) {
    var s = licenseServer,
        e = 'com.widevine.alpha',
        t = 'audio',
        url2 = [s, "?keysystem=", e, "&mediatype=", t].join("");
    
    var i = String.fromCharCode.apply(null, new Uint16Array(message));
    //var response = await fetch(url.replace('@webgate', 'gew-spclient.spotify.com'));
    var response = await fetch('//' + url, {
        method: 'post',
        body: message
    });

    console.log(response);
}

// info: https://www.html5rocks.com/en/tutorials/eme/basics/
async function obtainKeys(el) {
    var token:any = await SpotifyAPI.token();
    var config = [{initDataTypes: ['cenc'],
        audioCapabilities: [{
            contentType: 'audio/mp4; codecs="mp4a.40.2"'
        }]
    }];
  
  if (!el.mediaKeys) {
    navigator.requestMediaKeySystemAccess('com.widevine.alpha',
        config).then(
      function(keySystemAccess) {
        var promise = keySystemAccess.createMediaKeys();
        promise.catch(
          console.error.bind(console, 'Unable to create MediaKeys')
        );
        promise.then(
          function(createdMediaKeys) {
            return el.setMediaKeys(createdMediaKeys);
          }
        ).catch(
          console.error.bind(console, 'Unable to set MediaKeys')
        );
        promise.then(
            function (createdMediaKeys) {
                el.addEventListener('encrypted', event => { 
                    var session = el.mediaKeys.createSession(); //createdMediaKeys
                    session.addEventListener('message', async function (event) {
                        var license = await requestLicense(event.message, token.uri);
                        var session = event.target;
                        session.update(license).catch(
                          function(error) {
                            console.error('Failed to update the session', error);
                          }
                        );
                    }, false);
                    session.generateRequest(event.initDataType, psshBox).catch(
                      function(error) {
                        console.error('Failed to generate a license request', error);
                      }
                    );
                }, false);
          }
        ).catch(
          console.error.bind(console,
            'Unable to create or initialize key session')
        );
      }
    );
  }
  
  function handleMessage(event) {
    var keySession = event.target;
    //var license = new Uint8Array([...]);
    //keySession.update(license).catch(
    //  console.error.bind(console, 'update() failed')
    //);
  }
}

function id2fileId(id) {
    for (var b = '', c = 0, a = id.length; c < a; ++c) {
        b += id.charCodeAt(c).toString(16);
    }
    return b.toLowerCase();
}

const TrackItem = BB.View.extend({
    events: {
        'click .preview-play': 'playPreview',
        'click .preview-stop': 'stopPreview',
        'playend audio': 'stopPreview'
    },
    initialize: function (options) {
        this.api = options.api;
        this.playlistId = options.playlistId;
    },
    playPreview: function () {
        this.api.play(this.model.get('track'), this.playlistId);

        this.$('.preview-play').toggleClass('hidden', true);
        this.$('.preview-stop').toggleClass('hidden', false);

        false && this.$('video').each((i, el) => {
            el.load();
            el.play();
            var urlInfo = utils.parse_url(this.model.get('track').preview_url);
            console.log(
                this.model.get('track').uri,
                utils.uri2id(this.model.get('track').uri),
                utils.id2uri(utils.uriType(this.model.get('track').uri), this.model.get('track').id),
                utils.gid2id(_.last(urlInfo.segments)),
                utils.gid2uri(utils.uriType(this.model.get('track').uri), _.last(urlInfo.segments)),
                utils.id2uri(utils.uriType(this.model.get('track').uri), _.last(urlInfo.segments)),
                id2fileId(this.model.get('track').id)
             );
            //obtainKeys(el);
            //el.src = 'https://audio-fa.scdn.co/audio/0741f532f4e964ecc02adea2ea8dbcb9eeabad69?1514922540_QAjj/AYT3p9Pc+uSuBVpoEypRBQdzkX+yG8SEkrKoUs=';            
            //el.play();
            //return;
            false && (async () => {
                var ms = new MediaSource();
                //var response = await fetch(this.model.get('track').preview_url);
                var response = await fetch('https://audio-fa.scdn.co/audio/6947b3784042a1c6cc2445f53aa76750d3fa62f2?1514928478_r6V4eqPleV+Yi2HR1lU+GHgv61amDvgKksBReDw6nSw=');
                var buffer = await response.arrayBuffer();
                var mediaSource = new MediaSource;
                //console.log(mediaSource.readyState); // closed
                mediaSource.addEventListener('sourceopen', () => {
                    //console.log(this.readyState); // open
                    var mime = 'audio/mp4; codecs="mp4a.40.2"';
                    //var mime = 'audio/mpeg';
                    var sourceBuffer = mediaSource.addSourceBuffer(mime);
                    sourceBuffer.addEventListener('updateend', function (_) {
                        mediaSource.endOfStream();
                        //console.log(mediaSource.readyState); // ended
                    });
                    sourceBuffer.appendBuffer(buffer);
                });
                el.src = URL.createObjectURL(mediaSource);
                el.play();
            })();
        });
    },
    stopPreview: function () {
        this.$('.preview-stop').toggleClass('hidden', true);
        this.$('.preview-play').toggleClass('hidden', false);
        
        this.$('video').each((i, el) => {
            el.pause();
        });
    },
    toHTML: function () {
        var data = this.model.toJSON(),
            html = template(_.extend({
                cid: this.cid,
                duration: function () { return Format.duration(this.duration_ms / 1000) },
                preview_url: 'true'
            }, data.track ? data : { track: data }));

        return html;
    },
    render: function () {
        var html = this.toHTML();

        this.$el.html(html);
        this.$('video').on('ended', evnt => {
            this.$(evnt.target).trigger('playend');
        });

        return this;
    }
});

export { TrackItem };
