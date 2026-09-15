// Stack of currently allocated BYOND UI element ids.
export const byondUiStack: Array<string | null> = [];

// How often ByondUI will update sizes, when resizing window in ms
export const resizeInterval: number = 100;
