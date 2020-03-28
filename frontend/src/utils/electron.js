export default function isElectron() {
    return typeof window.require === 'function';
}
