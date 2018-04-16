import * as BB from 'backbone';
import { Search } from '../views/search';
import { MainPresenter } from '../presenters/main';


namespace SearchSpace {
    export interface IOptions extends BB.ViewOptions<any> {
        app: BB.Router;
        api: MainPresenter;
    }
}

interface SearchSpace {
    app: BB.Router;
    api: MainPresenter;
}

class SearchSpace extends BB.View<any> {
    constructor(options: SearchSpace.IOptions) {
        super(options);
    }
    initialize(options) {
        this.app = options.app;
        this.api = options.api;
    }
    view() {
        return new Search({
            api: this.api,
            collection: this.api.search()
        });
    }
}

export { SearchSpace };
