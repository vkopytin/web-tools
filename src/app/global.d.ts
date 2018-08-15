type Constructor<T = {}> = new (...args) => T;
type ViewConstructor<T = {}, O = {}> = new (options?: O) => T;

declare module '*.mustache' {
    function content(...args): string;
    export=content;
}

interface JQueryStatic {
    ui: any; // Replace with your types
}

interface JQuery {
    sortable: any;
}
