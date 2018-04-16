declare module '*.mustache' {
    function content(...args): string;
    export=content;
}

interface JQueryStatic {
    ui: any; // Replace with your types
  }
