declare module '*.scss' {
    const content: any;
    export default content;
}

declare module '*.css' {
    const content: any;
    export default content;
}

declare interface Ii18nContext {
    locale: string
}
