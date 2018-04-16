import '../css/app.css';
import * as BB from 'backbone';
import { App } from './app';

(function () {
    new App();
    BB.history.start({ pushState: true });
})();