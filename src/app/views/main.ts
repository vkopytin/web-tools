import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { Navigation } from './navigation';

const template = require('../templates/main')


const MainView = BB.View.extend({
    events: {
        'click a:not([data-bypass])': 'navigate',
        'saving': 'showSpinner',
        'saved': 'hideSpinner',
        'loading': 'showSpinner',
        'loaded': 'hideSpinner'
    },
    initialize: function (options) {
        this.api = options.api;
    },
    navigate: function (evnt) {
        var $el = this.$(evnt.currentTarget),
            href = $el.attr('href'),
            protocol = $el.prop('protocol') + '//';

        if (href && href.slice(0, protocol.length) !== protocol &&
            href.indexOf("javascript:") !== 0) {
            evnt.preventDefault();

            BB.history.navigate(href, true);
        }
    },
    showModal: function (view) {
        this.$('.modal-region').toggleClass('active', true);
        var modal = this.modal;
        if (this.modal) {
            this.modal.remove();
        }
        this.showSpinner();
        modal = this.content = view;
        this.$('.modal-region').html(view.render().el);
        this.hideSpinner();
    },
    setContent: function (view) {
        this.$('.modal-region').toggleClass('active', false);
        var content = this.content;
        if (this.content) {
            this.content.remove();
        }
        this.showSpinner();
        content = this.content = view;
        this.$('.main').html(view.el);
        view.render();
        this.hideSpinner();
    },
    showSpinner: function () {
        this.$el.toggleClass('loading', true);
    },
    hideSpinner: function () {
        this.$el.toggleClass('loading', false);
    },
    setActiveNav: function (navName) {
        this.navigationBar.setActive(navName);
    },
    render: function () {
        var html = template();

        this.$el.html(html);

        this.navigationBar = new Navigation({
            el: this.$('.navigation-bar')
        }).render();

        return this;
    }
});

export { MainView };
