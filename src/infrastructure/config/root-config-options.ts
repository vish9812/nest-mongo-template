import Joi = require('@hapi/joi');

export default (options: RootConfigOptions): any => ({
  expandVariables: true,
  envFilePath: ['local.env', 'test.env'],
  ...options,
});

export interface RootConfigOptions {
  load: any[];
  validationSchema: Joi.ObjectSchema<any>;
}
