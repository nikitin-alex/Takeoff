import { config } from './config';

function paramFabric(method: 'POST' | 'PUT', data: DataProps) {
    const url = `${config.url}contacts`;
    const props = {
        method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    };
    return { url, props }
}

export async function updateContact(data: DataProps) {
    const { url, props } = paramFabric('PUT', data);
    const resp = await fetch(url, props);
    return await resp.json();
}

export async function insertContact(data: DataProps) {
    const { url, props } = paramFabric('POST', data);
    const resp = await fetch(url, props);
    return await resp.json();
}