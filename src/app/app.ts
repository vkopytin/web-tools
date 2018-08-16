import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { MainView } from './views/main';
import { MainPresenter } from './presenters/main';
import * as spaces from './spaces';
import { routes } from './utils/bbUtils';
import { DI } from './di/DI';
import './moduleLoader';


@routes({
    ':space(/:view)(/:id)': 'view',
    '(/)': 'index'
})
class App extends BB.Router {
    api: MainPresenter;
    master: MainView;

    initialize() {
        this.api = DI.instance({ MainPresenter });
        this.master = new MainView({
            el: document.body,
            api: this.api
        }).render();

        _.defer(async () => {
            if (!await this.api.tokenLogin()) {
                BB.history.navigate('/login', true);
            } else {
                BB.history.navigate('/home', true);
            }
        })
    }

    findSpace<T extends { [key: string]: new (...args) => Y }, Y>(spaces, name): T {
        const $TypeInfo = _.pick(
            spaces
            ,
            (v, k: string) => (k.replace(/Space$/i, '').toLowerCase() === name.toLowerCase())
        );

        return $TypeInfo;
    }

    createSpace(name) {
        var $TypeInfo = this.findSpace(spaces, name);

        return DI.instance($TypeInfo);
    }

    callAction(inst, action, args) {
        return inst[action].apply(inst, args);
    }

    view(spaceName, action?, id?) {
        var action = action || 'view',
            space = this.createSpace(spaceName),
            view = this.callAction(space, action, [id]);

        this.master.setContent(view);
        this.master.setActiveNav(spaceName);
    }

    index() {
        this.view('home');
    }

}

export { App };
