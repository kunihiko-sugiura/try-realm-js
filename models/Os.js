/**
 * Created by kuni on 2017/03/05.
 */
class Os {}
Os.schema = {
    name:       'Os',
    primaryKey: 'id',
    properties: {
        id:      {type: 'string'},
        name:    {type: 'string'},
        company: {type: 'Company'},
        version: {type: 'string'},
        year:    {type: 'int', indexed: true}
    }
};
export default Os;