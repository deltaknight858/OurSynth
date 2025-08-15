import Ajv from 'ajv';
import { readFileSync } from 'fs';
import { join } from 'path';

const rootDir = process.cwd();
const actionsSchemaPath = join(rootDir, '.oursynth', 'actions.schema.json');
const actionsDataPath = join(rootDir, '.oursynth', 'actions.json');

const log = (message) => console.log(`[Schema Validation] ${message}`);
const error = (message) => console.error(`[Schema Validation Error] ${message}`);

async function validateActionsSchema() {
  log('Starting actions.json schema validation...');

  try {
    const schema = JSON.parse(readFileSync(actionsSchemaPath, 'utf8'));
    const data = JSON.parse(readFileSync(actionsDataPath, 'utf8'));

    const ajv = new Ajv();
    const validate = ajv.compile(schema);

    const isValid = validate(data);

    if (isValid) {
      log('actions.json is VALID against the schema.');
      process.exit(0);
    } else {
      error('actions.json is INVALID against the schema.');
      if (validate.errors) {
        validate.errors.forEach((err) => {
          error(`- Data path: ${err.instancePath}`);
          error(`  Message: ${err.message}`);
          error(`  Schema path: ${err.schemaPath}`);
        });
      }
      process.exit(1);
    }
  } catch (e) {
    error(`An error occurred during validation: ${e.message}`);
    process.exit(1);
  }
}

validateActionsSchema();
