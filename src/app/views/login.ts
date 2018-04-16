import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';

const template = require('../templates/login');


const Login = BB.View.extend({
    events: {
        'click .profile-login': 'profileLogin'
    },
    initialize: function (options) {
        this.api = options.api;
    },
    profileLogin: async function (evnt) {
        var username = this.$('.login-username').val(),
            password = this.$('.login-password').val();    
        evnt && evnt.preventDefault();

        await this.api.login(username, password);
        this.$('.modal').toggleClass('active');
        BB.history.navigate('/', true);
    },
    toHTML: function () {
        return template(_.extend({
            cid: this.cid
        }, this.views));
    },
    render: function () {
        var html = this.toHTML();

        this.$el.html(html);

        this.$('.modal').toggleClass('active');

        return this;
    }
});

export { Login };
