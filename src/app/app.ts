import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { MainView } from './views/main';
import { Playlists } from './views/playlists';
import { Content } from './views/content';
import { Login } from './views/login';
import { MainPresenter } from './presenters/main';
import * as spaces from './spaces';
import { routes } from './utils/bbUtils';

@routes({
    ':space(/:view)(/:id)': 'view',
    '(/)': 'index'
})
class App extends BB.Router {
    api: MainPresenter;
    master: MainView;

    initialize() {
        this.api = new MainPresenter();
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

    findSpace<T extends new(...args) => T>(spaces, name): T {
        return _.find(spaces, (v, k: string) => (k.replace(/Space$/i, '').toLowerCase() === name.toLowerCase()));
    }

    createSpace(name) {
        var Ctor = this.findSpace(spaces, name);

        return new Ctor({
            app: this,
            api: this.api
        });
    }

    callAction(inst, action, args) {
        return inst[action].apply(inst, args);
    }

    view(space, action?, id?) {
        var action = action || 'view',
            inst = this.createSpace(space),
            view = this.callAction(inst, action, [id]);

        this.master.setContent(view);
        this.master.setActiveNav(space);
    }

    index() {
        this.view('home');
    }

}

export { App };
