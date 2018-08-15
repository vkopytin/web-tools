import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { Navigation } from './navigation';
import { MainPresenter } from '../presenters/main';
import template = require('../templates/main.mustache');
import { events } from '../utils/bbUtils';


namespace MainView {
    export interface IOptions extends BB.ViewOptions<any> {
        api: MainPresenter;
    }
}

interface MainView {
    api: MainPresenter;
    modal: BB.View<any>;
    content: BB.View<any>;
    navigationBar: Navigation;
}

@events({
    'click a:not([data-bypass])': 'navigate',
    'saving': 'showSpinner',
    'saved': 'hideSpinner',
    'loading': 'showSpinner',
    'loaded': 'hideSpinner'
})
class MainView extends BB.View<any> {
    constructor(options: MainView.IOptions) {
        super(options);
    }

    initialize(options) {
        this.api = options.api;
    }
    navigate(evnt) {
        var $el = this.$(evnt.currentTarget),
            href = $el.attr('href'),
            protocol = $el.prop('protocol') + '//';

        if (href && href.slice(0, protocol.length) !== protocol &&
            href.indexOf("javascript:") !== 0) {
            evnt.preventDefault();

            BB.history.navigate(href, true);
        }
    }
    showModal(view) {
        this.$('.modal-region').toggleClass('active', true);
        var modal = this.modal;
        if (this.modal) {
            this.modal.remove();
        }
        this.showSpinner();
        modal = this.content = view;
        this.$('.modal-region').html(view.el);
        view.render();
        this.hideSpinner();
    }
    setContent (view) {
        this.$('.modal-region').toggleClass('active', false);
        const content = this.content;
        if (content) {
            _.result(content, 'close', () => content.remove());
        }
        this.showSpinner();
        this.content = view;
        this.$('.main').prepend(view.el);
        view.setElement(view.el); // toDO: refactor
        view.$el.toggleClass('hidden', false);
        view.render();
        this.hideSpinner();
    }
    showSpinner() {
        this.$el.toggleClass('loading', true);
    }
    hideSpinner() {
        this.$el.toggleClass('loading', false);
    }
    setActiveNav(navName) {
        this.navigationBar.setActive(navName);
    }
    render() {
        var html = template();

        this.$el.html(html);

        this.navigationBar = new Navigation({
            el: this.$('.navigation-bar'),
            api: this.api
        }).render();

        return this;
    }
}

export { MainView };
