import * as BB from 'backbone';
import { Base } from '../views/base';
import { Login } from '../views/login';
import { MainPresenter } from '../presenters/main';
import { ViewModel } from '../di/ViewModel';


namespace LoginSpace {
    export interface IOptions extends BB.ViewOptions<any> {
    }
}

interface LoginSpace {
}
class LoginSpace extends ViewModel(Base, { MainPresenter })<BB.Model> {
    view() {
        return this;
    }
    remove() {
        this.$el.toggleClass('hidden');
        return this;
    }
}

export { LoginSpace };
