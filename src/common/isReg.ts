import { getCookie } from "./getCookie";

export function isReg() { return !!getCookie("testUser") };