/**
 * Created by kuni on 2017/03/05.
 */
import SchemaVersion from '../db/schemaVersion';

class Company {}
Company.schema = {
    name: 'Company',
    primaryKey: 'id',
    properties: {
        id:    'string',
        name:    {type: 'string', default: '', indexed: true}
    }
};
if( SchemaVersion >= 1 ){
    Company.schema.properties.place = {type: 'string', default: 'US'};
}
export default Company;