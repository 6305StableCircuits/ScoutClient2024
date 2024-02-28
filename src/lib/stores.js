import { writable } from 'svelte/store';

export const teamNum = writable(0);
export const roundNum = writable(0);
export const alliance = writable("");
export const scouterName = writable("");
export const savedData = writable([]);