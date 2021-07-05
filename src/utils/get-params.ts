const getParams = (arr: { param: string; value: string }[]) => arr.map((q) => `&${q.param}=${q.value}`).join('');

export default getParams;
