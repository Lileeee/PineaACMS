export interface IWindowAPI {
    fs: typeof fs;
}
declare global {
    interface Window {
        WindowAPI: IWindowAPI;
    }
}
