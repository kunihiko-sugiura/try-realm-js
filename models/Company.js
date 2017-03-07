/**
 * Created by kuni on 2017/03/05.
 */
class Company {}
Company.schema = {
    name: 'Company',
    primaryKey: 'id',
    properties: {
        id:    'string',
        name:    {type: 'string', default: '', indexed: true}
    }
};
export default Company;