/**
 * Created by kuni on 2017/03/05.
 */
class Company {}
Company.schema = {
    name: 'Company',
    primaryKey: 'id',
    properties: {
        id:    'string',
        name:    {type: 'string', indexed: true}
    }
};
export default Company;