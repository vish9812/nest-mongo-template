declare type MongooseDocument = import('mongoose').Document;
declare type MongooseModel = import('mongoose').Model<MongooseDocument>;

declare module '*schema' {
  const model: MongooseModel;
  export default model;
}
