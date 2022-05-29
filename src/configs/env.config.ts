// here u cant import Joi from 'joi'
import * as Joi from 'joi';

//============================Validation-Functions==========================

const validatePortNumber = Joi.number().default(7575);

const validateNodeEnv = Joi.string()
  .valid('production', 'development', 'staging', 'test')
  .default('development');

//============================Configs========================================

const envValidationSchema = Joi.object({
  NODE_ENV: validateNodeEnv,
  PORT: validatePortNumber,
});

// If a variable is found in multiple files, the first one takes precedence.
const envFilePaths = ['.env', 'dist/.env', '.env.development.local'];

//============================Exports=========================================

export const envConfigs = {
  cache: true,
  isGlobal: true,
  envFilePath: envFilePaths,
  envValidationSchema: envValidationSchema,
};
