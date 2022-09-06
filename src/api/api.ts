import axios from "axios";

const instance = axios.create({
  baseURL: "http://79.143.31.216/",
});

export interface IData {
  username: string;
  password: string;
}

export interface IResp {
  username: string;
}

export interface IRej {
  detail: string;
}

export interface IRespLogin {
  access_token: string;
  token_type: string;
}

export interface ISqueezy {
  link: string;
}

export interface IRespSqueezy {
  id: number;
  short: string;
  target: string;
  counter: number;
}

const API = {

  async registration({ username, password }: IData) {
    const { data } = await instance.post<IResp>(
      `register?username=${username}&password=${password}`
    );
    return data;
  },

  async login({ username, password }: IData) {
    const { data } = await instance.post<IRespLogin>(
      "login",
      `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    instance.defaults.headers.common["Authorization"] = `${data.token_type} ${data.access_token}`;
  },

  async squeezy({ link }: ISqueezy) {
    await instance.post(`squeeze?link=${encodeURIComponent(link)}`)
  },

  async getStatistics(offset: number) {
    const { data } = await instance.get<IRespSqueezy[]>(`statistics?offset=${offset}&limit=40`);
    return data;
  },
};

export default API;
