/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as NodeCache from 'node-cache';
import axios from 'axios';

@Injectable()
export class CacheService {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });
  }

  set<T>(key: string, value: T, ttl?: number): void {
    this.cache.set(key, value, ttl);
  }

  get<T>(key: string): T | undefined {
    return this.cache.get(key);
  }

  del(key: string): void {
    this.cache.del(key);
  }

  flushAll(): void {
    this.cache.flushAll();
  }

  async getToken(): Promise<string> {
    const cachedToken: string = this.get<string>('accessToken');
    if (cachedToken) {
      return cachedToken;
    }

    const response = await axios.post('http://20.244.56.144/test/auth', {
      companyName: 'goMart',
      clientID: '830330ba-7ff8-44b9-b69c-e8c7dc5edd3d',
      clientSecret: 'gJRzIgJeUDzoxEWI',
      ownerName: 'Rahul',
      ownerEmail: 'avaneesh.07619011921@ipu.ac.in',
      rollNo: '07619011921',
    });
    const { access_token, expires_in } = response.data;
    const ttl = expires_in - 60;

    this.set('accessToken', access_token, ttl);
    return access_token;
  }
}
