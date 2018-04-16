import * as BB from 'backbone';
import * as _ from 'underscore';


const debounce = (wait: number) => (target, b, c) => {
    c.value = _.debounce(c.value, wait);
};

const className = (value: string) => <T extends new (...args) => Y, Y>(target: T) => {
    _.extend(target.prototype, { className: value });
};
const events = (value) => <T extends new (...args) => Y, Y>(target: T) => {
    _.extend(target.prototype, { events: value });
};
const routes = (value) => <T extends new (...args) => Y, Y>(target: T) => {
    _.extend(target.prototype, { routes: value });
};
const defaults = <Z>(value: Z) => <T extends new (...args) => Y, Y>(target: T) => {
    _.extend(target.prototype, { defaults: value });
};
const model = (value) => <T extends new (...args) => Y, Y>(target: T) => {
    _.extend(target.prototype, { model: value });
};
const url = (value: string) => <T extends new (...args) => Y, Y>(target: T) => {
    _.extend(target.prototype, { url: value });
};
const tagName = (value: string) => <T extends new (...args) => Y, Y>(target: T) => {
    _.extend(target.prototype, { tagName: value });
};

export {
    routes,
    debounce,
    className,
    events,
    tagName,
    defaults,
    model,
    url
};
