import * as _ from 'underscore';
import * as $ from 'jquery';
import * as BB from 'backbone';
import { initialState } from '../initialState';
import { Store, Action } from '../store';
import { render } from '../templates/main.tpl';
import { patch } from 'incremental-dom';


const MainView = BB.View.extend({
    events: {
        'input .search-post': 'searchPost',
        'click .site': 'updateDomainUrl' // think about it...
    },
    initialize: function () {
        this.model = new BB.Model(initialState); // this
        this.listenTo(this.model, 'change', this.render);
    },
    searchPost: function (evnt) {
        evnt && evnt.preventDefault();
        var value = this.$(evnt.currentTarget).val();
        this.model.set('searchPost', value);
    },
    updateDomainUrl: function (evnt) {
        evnt && evnt.preventDefault();
        var id = this.$(evnt.currentTarget).data('id');

        this.model.set('currentSite', this.model.get('sites')[id]);
    },
    render: function () {
        var data = this.model.toJSON();

        patch(this.el, () => render({
            sites: _.values(data.sites),
            currentSite: data.currentSite,
            state: {
                pending: false,
                posts: []
            },
            searchPost: data.searchPost
        }));

        return this;
    }
});

const ViewModel = BB.Router.extend({
    getSites: function () {
        return initialState.sites;
    },
    setSites: function () {
        this.trigger('change:Sites');
    }
});

export { MainView };
