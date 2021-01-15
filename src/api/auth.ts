import { config } from './config';

export async function getUser(userName: string, password: string) {
  const url = `${config.url}users?userName=${userName}&password=${password}`;
  const resp = await fetch(url);
  return await resp.json();
}