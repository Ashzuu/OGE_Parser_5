// chrome-env.d.ts
interface ChromeMock {
    storage: {
        local: {
            get: (keys: string | string[], callback: (items: { [key: string]: any }) => void) => void;
            set: (items: { [key: string]: any }, callback?: () => void) => void;
        };
    };
    runtime: {
        lastError?: Error;
    };
}

declare global {
    interface Window {
        chrome: typeof chrome;
    }
}

export { };
