/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { Model as MongooseModel, Document as MongooseDocument } from 'mongoose';
import { DbRequest } from './models/db-request';

@Injectable()
export class DatabaseService {
  public async GetOne<T>(
    Model: MongooseModel<MongooseDocument>,
    { match, sort }: DbRequest,
  ): Promise<T> {
    const query = Model.findOne(match);

    if (sort) {
      query.sort(sort);
    }

    return (await query.exec())?.toObject();
  }

  public async Get<T>(
    Model: MongooseModel<MongooseDocument>,
    { match, sort, limit }: DbRequest,
  ): Promise<T[]> {
    const query = Model.find(match);

    if (sort) {
      query.sort(sort);
    }
    if (limit) {
      query.limit(limit);
    }

    return (await query.exec()).map(obj => (obj as any) as T);
  }

  public async Post<T, ParamType = T>(
    Model: MongooseModel<MongooseDocument>,
    newItem: ParamType,
  ): Promise<T> {
    const doc = new Model(newItem);
    const result = await doc.save();

    return result.toObject();
  }
}
