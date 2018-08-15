import * as BB from 'backbone';


class Base<T extends BB.Model> extends BB.View<T> {
    appendTo($el) {
        this.$el.appendTo($el);
        return this;
    }
}

export { Base };
