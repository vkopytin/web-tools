import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { MainPresenter } from '../presenters/main';
import { debounce, events } from '../utils/bbUtils';
import template = require('../templates/login.mustache');
import { setCookie, getCookie } from '../utils/cookie';


namespace Login {
    export interface IOptions extends BB.ViewOptions<any> {
        api: MainPresenter;
    }
}

interface Login {
    api: MainPresenter;
}

@events({
    'click .profile-login': 'profileLogin'
})
class Login extends BB.View<any> {
    constructor(options: Login.IOptions) {
        super(options)
    }

    initialize(options) {
        this.api = options.api;
    }
    async profileLogin (evnt) {
        var username = this.$('.login-username').val(),
            password = this.$('.login-password').val(),
            token = this.$('.login-token').val();
        evnt && evnt.preventDefault();

        if (token) {
            setCookie('wp_access_token', token, 90);
            BB.history.navigate('/', true);
            return;
        }

        await this.api.login(username, password);
        this.$('.modal').toggleClass('active', false);
        BB.history.navigate('/', true);
    }
    close() {
        this.$('.modal').toggleClass('active', false);
        _.delay(() => {
            this.remove();
        }, 500);    
        return this;
    }
    toHTML() {
        return template(_.extend({
            cid: this.cid,
            token: getCookie('wp_access_token')
        }));
    }
    render() {
        var html = this.toHTML();

        this.$el.html(html);

        _.defer(() => {
            this.$('.modal').toggleClass('active', true);
        });    

        return this;
    }
}

export { Login };
