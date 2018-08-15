import * as BB from 'backbone';
import { Base } from '../views/base';
import { Search } from '../views/search';
import { MainPresenter } from '../presenters/main';
import { ViewModel } from '../di/ViewModel';


class SearchSpace extends ViewModel(Base, { MainPresenter })<BB.Model> {

    view() {
        return this;
    }
    remove() {
        this.$el.toggleClass('hidden');
        return this;
    }
}

export { SearchSpace };
