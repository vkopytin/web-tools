import * as BB from 'backbone';
import { Base } from '../views/base';
import { MainPresenter } from '../presenters/main';
import { ViewModel } from '../di/ViewModel';


namespace HomeSpace {
    export interface IOptions extends BB.ViewOptions<any> {
        app: BB.Router;
    }
}

interface HomeSpace {
    app: BB.Router;
    api: MainPresenter;
}

class HomeSpace extends ViewModel(Base, { MainPresenter })<BB.Model> {
    view() {
        return this;
    }
    remove() {
        this.$el.toggleClass('hidden');
        return this;
    }
}

export { HomeSpace };
