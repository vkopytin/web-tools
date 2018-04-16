import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { MainPresenter } from '../presenters/main';
import { debounce, events } from '../utils/bbUtils';
import template = require('../templates/login.mustache');


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
            password = this.$('.login-password').val();    
        evnt && evnt.preventDefault();

        await this.api.login(username, password);
        this.$('.modal').toggleClass('active');
        BB.history.navigate('/', true);
    }
    toHTML() {
        return template(_.extend({
            cid: this.cid
        }));
    }
    render() {
        var html = this.toHTML();

        this.$el.html(html);

        this.$('.modal').toggleClass('active');

        return this;
    }
}

export { Login };
