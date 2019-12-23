export const pretty = obj => JSON.stringify(obj, null, 2);

// eslint-disable-next-line no-console
export const prettyPrint = obj => console.log(pretty(obj));
