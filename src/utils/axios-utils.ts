import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:4000" });

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer token`;
  const onSuccess = (res: any) => res;
  const onError = (err: any) => {
    //Optionall catch errors and add additional logging here
    return err;
  };
  return client(options).then(onSuccess).catch(onError);
};
