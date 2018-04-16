import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { Format } from '../utils/format';
import { SpotifyAPI } from '../spotifyAPI';
import * as utils from '../utils';
import { MainPresenter } from '../presenters/main';
import { events } from '../utils/bbUtils';
import template = require('../templates/trackItem.mustache');


namespace TrackItem {
    export interface IOptions extends BB.ViewOptions<any> {
        api: MainPresenter;
        playlistId?: string;
    }
}
@events({
    'click .preview-play': 'playPreview',
    'click .preview-stop': 'stopPreview',
    'playend audio': 'stopPreview'
})
class TrackItem extends BB.View<any> {
    constructor(options: TrackItem.IOptions) {
        super(options);
    }
    api: MainPresenter;
    playlistId: string;
    initialize(options) {
        this.api = options.api;
        this.playlistId = options.playlistId;
    }
    playPreview() {
        if (this.playlistId) {
            this.api.play(this.model.get('track'), this.playlistId);
        } else {
            this.api.playTrack(this.model.toJSON());
        }    

        this.$('.preview-play').toggleClass('hidden', true);
        this.$('.preview-stop').toggleClass('hidden', false);
    }
    stopPreview() {
        this.$('.preview-stop').toggleClass('hidden', true);
        this.$('.preview-play').toggleClass('hidden', false);
        
        this.$('video').each((i, el: HTMLVideoElement) => {
            el.pause();
        });
    }
    toHTML() {
        var data = this.model.toJSON(),
            html = template(_.extend({
                cid: this.cid,
                duration: function () { return Format.duration(this.duration_ms / 1000) },
                preview_url: 'true'
            }, data.track ? data : { track: data }));

        return html;
    }
    render() {
        var html = this.toHTML();

        this.$el.html(html);
        this.$('video').on('ended', evnt => {
            this.$(evnt.target).trigger('playend');
        });

        return this;
    }
}

export { TrackItem };
