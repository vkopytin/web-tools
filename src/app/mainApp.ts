declare function require(name: string): string;
require('bare.less');
require('app.css');

import { MainView } from './views/main';

setTimeout(() => {
    var existingPlaceholder = document.getElementById('wrapper'),
        div = document.createElement('DIV');
    
    if (!existingPlaceholder) {
        div.innerHTML = `<div id="wrapper" class="ios6 sidebar sidebar--shadow"></div>`;
        document.body.appendChild(div.firstChild);
    }
    setTimeout(() => {
        new MainView({
            el: document.getElementById('wrapper')
        }).render();
    }, 500);
});
