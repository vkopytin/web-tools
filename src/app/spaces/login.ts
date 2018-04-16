import * as BB from 'backbone';
import { Login } from '../views/login';

const LoginSpace = BB.View.extend({
    initialize: function (options) {
        this.app = options.app;
        this.api = options.api;
    },
    view: function () {
        return new Login({
            api: this.api
        });
    }
});

export { LoginSpace };
