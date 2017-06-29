
import { AxiosInstance } from 'axios';

export namespace TodoApi {
  export type Entry = {
    id: number;
    name: string;
    done: boolean;
  };

  export type GetListResponse = Entry[];
}

export class TodoApi {
  constructor(
    private httpClient: AxiosInstance
  ) {}

  getList(): Promise<TodoApi.GetListResponse> {
    return this.httpClient.get('/todo').then(response => response.data);
  }
}
