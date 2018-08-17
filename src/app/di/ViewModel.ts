import { DI } from './DI';

// tslint:disable-next-line: max-line-length
const ViewModel = <TBase extends Constructor, TViewModel>(Base: TBase, viewModelInfo: { [key: string]: Constructor<TViewModel> }) => class extends Base {
    get viewModel() {
        return DI.get(viewModelInfo);
    }
};

export { ViewModel };
