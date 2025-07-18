declare module '*.html' {
    const rawHtmlFile: string;
    export = rawHtmlFile;
}

declare module '*.bmp' {
    const src: string;
    export default src;
}

declare module '*.gif' {
    const src: string;
    export default src;
}

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
    const src: string;
    export default src;
}

export declare type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
    | {
          error: E;
          data?: undefined;
          meta?: M;
      }
    | {
          error?: undefined;
          data: T;
          meta?: M;
      };
