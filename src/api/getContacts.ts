import { config } from './config';

export async function getContacts() {
  const url = `${config.url}contacts`;
  const resp = await fetch(url);
  return await resp.json();
}