import * as BB from 'backbone';
import { Search } from '../views/search';

const SearchSpace = BB.View.extend({
    initialize: function (options) {
        this.app = options.app;
        this.api = options.api;
    },
    view: function () {
        return new Search({
            api: this.api,
            collection: this.api.search()
        });
    }
});

export { SearchSpace };
