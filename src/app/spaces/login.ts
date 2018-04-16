import * as BB from 'backbone';
import { Login } from '../views/login';
import { MainPresenter } from '../presenters/main';


namespace LoginSpace {
    export interface IOptions extends BB.ViewOptions<any> {
        app: BB.Router;
        api: MainPresenter;
    }
}

interface LoginSpace {
    app: BB.Router;
    api: MainPresenter;
}
class LoginSpace extends BB.View<any> {
    constructor(options: LoginSpace.IOptions) {
        super(options);
    }
    initialize(options) {
        this.app = options.app;
        this.api = options.api;
    }
    view() {
        return new Login({
            api: this.api
        });
    }
}

export { LoginSpace };
