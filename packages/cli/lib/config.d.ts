export interface Config {
    slide?: {
        width?: number;
        height?: number;
    };
    app?: {
        qrUrl?: string;
        serverUrl?: string;
        port?: number;
    };
    auth?: {
        password?: string;
        authenticate?: (secret: string) => boolean;
        validate?: (secret: string) => boolean;
    };
}

export interface FinalConfig {
    width?: number | null;
    height?: number | null;
    port?: number | null;
    qrUrl?: string | null;
    serverUrl?: string | null;
    password?: string | null;
    authenticate?: ((secret: string) => boolean) | null;
    validate?: ((secret: string) => boolean) | null;
}
