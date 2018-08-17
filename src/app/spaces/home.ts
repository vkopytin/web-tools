import * as BB from 'backbone';
import { Base } from '../views/base';
import { MainPresenter } from '../presenters/main';
import { ViewModel } from '../di/ViewModel';


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
