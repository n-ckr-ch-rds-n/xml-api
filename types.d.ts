declare module "mockserver-node" {
    export function start_mockserver(options: {serverPort: number, trace: boolean}): void;
    export function stop_mockserver(options: {serverPort: number}): void;
}
