import axios, { AxiosInstance } from 'axios';
import DataObject from '../../utils/DataObject';
import IDataProvider from '../Index';
import { DataTypes } from '../types/dataTypes';

export default class APIParqueDaMonicaDataProvider implements IDataProvider {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: 'http://192.168.160.12:3050/api/v1/',
    })
  }

  async getData(dataType: DataTypes): Promise<DataObject> {
    this.instance.defaults.headers.common['x-access-token'] = await this.getAuthToken();

    switch (dataType) {
      case 'clients': {
        const { data } = await this.instance.post('/clients');
        return new DataObject(dataType, data);
      }

      case 'venda': {
        const { data } = await this.instance.post('/vendas');
        return new DataObject(dataType, data);
      }

      case 'calendario': {
        const { data } = await this.instance.post('/calendario');
        return new DataObject(dataType, data);
      }

      default:
        return new DataObject('', []);
    }
  }

  private async getAuthToken(): Promise<string> {
    const { data } = await this.instance.post('/login', {
      login: 'marketing',
      password: 'OyViUH0ViKmqH8WDhkAQfcp0orISKYuINJwNugki',
    });

    return data.token;
  }
}
