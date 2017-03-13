/**
 * Created by kuni on 2017/03/09.
 */
import SchemaVersion from './schemaVersion';
import Os from '../models/Os';
import Company from '../models/Company';
import migration_001 from '../db_migration/migration_function_001';

export default {
    schemaVersion: SchemaVersion,
    list: [
        { 'schema': [ Company ], schemaVersion: 0 },
        { 'schema': [ Company ], schemaVersion: 1, 'migration': migration_001 },
        { 'schema': [ Company, Os ], schemaVersion: 2 },
    ]
};
