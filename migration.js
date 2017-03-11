/**
 * Created by kuni on 2017/03/08.
 */
import fs from 'fs';
import Schemas from './db/schemas';
import Realm from "realm";
import DefaultPath from './db/defaultPath';

try{
    fs.accessSync( DefaultPath, fs.R_OK );
}catch(e){
    const config = {
        path:           DefaultPath,
        schema:         Schemas.list[Schemas.schemaVersion].schema,
        schemaVersion:  Schemas.schemaVersion
    };
    let realm = new Realm(config);
    realm.close();
}

// ** Migration
let currentSchemaIndex = Realm.schemaVersion(DefaultPath);
while (currentSchemaIndex < Schemas.schemaVersion) {
    let config = Schemas.list[ ++currentSchemaIndex ];
       config.path = DefaultPath;

     let migratedRealm = new Realm(config);
     migratedRealm.close();
}
