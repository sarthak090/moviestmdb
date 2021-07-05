import fetch from 'node-fetch';
const request = (url: string): Promise<any> => {
  return new Promise(async (resovle, rejecet) => {
    try {
      const resp = await fetch(url);
      const response = await resp.json();

      if (response.success === false) {
        return rejecet(response);
      } else {
        return resovle(response);
      }
    } catch (err) {
      return rejecet(errorMsg(err));
    }
  });
};
const errorMsg = (args: { status?: number; type?: number; msg: string }) => {
  return {
    ...args,
  };
};
export default request;
