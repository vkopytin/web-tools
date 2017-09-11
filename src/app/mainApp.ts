import { render } from 'react-dom';
import { configureStore } from './store/configureStore';
import { routes } from './routes';
import { initialState } from './reducers';
import { template } from './mainApp.tpl';


declare function require(name: string): string;
require('app.css');

const store = configureStore(initialState);

setTimeout(() => {
    var existingPlaceholder = document.getElementById('web-tools'),
        div = document.createElement('DIV');
    
    if (!existingPlaceholder) {
        div.innerHTML = `<div id="web-tools" class="sidebar sidebar--shadow"></div>`;
        document.body.appendChild(div.firstChild);
    }
    setTimeout(() => {
        render(
            template(store, routes),
            document.getElementById('web-tools'),
            x => true
        );
    }, 500);
});
