import * as BB from 'backbone';
import { Base } from '../views/base';
import { Settings } from '../views/settings';
import { MainPresenter } from '../presenters/main';
import { ViewModel } from '../di/ViewModel';


class SettingsSpace extends ViewModel(Base, { MainPresenter })<BB.Model> {
    view() {
        return this;
    }
    remove() {
        this.$el.toggleClass('hidden');
        return this;
    }
}

export { SettingsSpace };
