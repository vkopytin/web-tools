import * as _ from 'underscore';
import { kvp } from './utils';


class DI {
    static types = {};
    static typesInst = {};

    static register<T>(typeInfo: { [key: string]: Constructor<T> }) {
        const [{ key, value }] = kvp(typeInfo);
        if (_.has(this.types, key)) {
            throw new Error(`Type: ${key} is already registered`);
        }
        this.types[key] = { $type: value };
        return typeInfo;
    }
    static registerWith<T>(typeInfo: { [key: string]: Constructor<T> }, options: {[key:string]: any}) {
        const [{ key, value }] = kvp(typeInfo);
        if (_.has(this.types, key)) {
            throw new Error(`Type: ${key} is already registered`);
        }
        this.types[key] = { $type: value, options };
    }
    static registerAsView<T>(viewInfo: { [key: string]: T }) {
        const [{ value: mix }, { key, value: core }] = kvp(viewInfo);
        if (_.has(this.types, key)) {
            throw new Error(`View: ${key} is already registered`);
        }
        this.types[key] = { $type: mix(core) };
    }

    static instance<T>(typeInfo: { [key: string]: Constructor<T> }): T {
        const [{ key }] = kvp(typeInfo);
        if (!_.has(this.typesInst, key)!) {
            const options = _.reduce(this.types[key].options, (res, value, key) => {
                    const typeInfo = {};
                    typeInfo[key] = value;
                    res.push(DI.instance(typeInfo));
                    return res;
                }, []),
                $type = this.types[key].$type,
                $ctor = $type.bind.apply($type, [null].concat(options));
            this.typesInst[key] = new $ctor();
        }
        return this.typesInst[key];
    }
    static create<T, O>(viewType: { [key: string]: ViewConstructor<T, O> }, options: O): T {
        const [{ key, value }] = kvp(viewType);
        if (_.has(this.types, key)) {
            return new (this.types[key].$type)(options);
        } else {
            return new value(options);
        }
    }
}

export { DI };
