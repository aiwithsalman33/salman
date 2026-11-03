/**
 * Inline <head> script, run before first paint: repeat visits in the same session
 * skip the boot lines (html[data-boot="repeat"], see .boot in globals.css).
 * Kept out of BootSequence.tsx because the server layout can't import values from a client module.
 */
export const bootScript = `try{var s=sessionStorage;if(s.getItem("boot-seen"))document.documentElement.dataset.boot="repeat";else s.setItem("boot-seen","1")}catch(e){}`;
