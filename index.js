import Realm from "realm";
import ShortId from "shortid";

import debug_log from './lib/debug_log';
import Schemas from './db/schemas';
import DefaultPath from './db/defaultPath';

import Os from './models/Os';
import Company from './models/Company';

const config = {
    path:           DefaultPath,
    schema:         Schemas.list[Schemas.schemaVersion].schema,
    schemaVersion:  Schemas.schemaVersion
};
let realm = new Realm(config);

// 全てのデータを消す
realm.write(() => {
    realm.deleteAll();
});

realm.write(() => {
    realm.create(Company.schema.name, {
        id:ShortId.generate(),
        name: 'Apple'
    });
    realm.create(Company.schema.name, {
        id:ShortId.generate(),
        name: 'Micro Soft'
    });
});

// ** Limiting Results
let companyApple = realm.objects(Company.schema.name).filtered('name = $0', "Apple").slice(0, 1);
let companyMs = realm.objects(Company.schema.name).filtered('name = $0', "Micro Soft").slice(0, 1);

// ** Listen Events
realm.objects(Os.schema.name).addListener((puppies, changes) => {
    changes.insertions.forEach((index) => {
    });
    changes.modifications.forEach((index) => {
        debug_log(puppies[index], 'Event Update Data');
    });
    changes.deletions.forEach((index) => {
        debug_log(puppies[index], 'Event Delete Data');
    });
});

let sierra = null;
// Create Realm objects and write to local storage
realm.write(() => {
    realm.create(Os.schema.name, {
        id: ShortId.generate(),
        name:    'Windows98',
        version: '98',
        company: companyMs[0],
        year:    1998
    });
    realm.create(Os.schema.name, {
        id: ShortId.generate(),
        name:    'Windows10',
        version: '10',
        company: companyMs[0],
        year:    2015
    });
    sierra = realm.create(Os.schema.name, {
        id: ShortId.generate(),
        name:    'macOS Sierra',
        version: '10.12',
        company: companyApple[0],
        year:    2014
    });

    debug_log(sierra.age, "sierra age");

    // ** insert
    realm.create(Os.schema.name, {
        id: ShortId.generate(),
        name:    'OS X El Capitan',
        version: '10.11',
        company: companyApple[0],
        year:    2015
    });

    realm.create(Os.schema.name, {
        id: ShortId.generate(),
        name:    'OS X Yosemite',
        version: '10.10',
        company: companyApple[0],
        year:    2014
    });
});
realm.write(() => {
    // ** Update
    sierra.year += 2;
});

let oses = realm.objects(Os.schema.name).filtered('year >= $0', 2014).slice( 0, 2);
debug_log(oses, "Oses");

// ** Delete
realm.write(() => {
    realm.delete(sierra);
});

// ** Filter Available comparison operators
// == , != , > , >= , < , <= , BEGINSWITH , ENDSWITH , CONTAINS

// ** Filter BeginWith
let foundBeginWith = realm.objects(Os.schema.name).filtered('name BEGINSWITH $0', "OS");
debug_log(
    foundBeginWith, 'Filter BeginWith * OS'
);

// ** Filter EndWith
let foundEndWith = realm.objects(Os.schema.name).filtered('name ENDSWITH $0', "Yosemite");
debug_log(
    foundEndWith, 'Filter EndWith * Yosemite'
);

// ** Filter Contain
let foundContain = realm.objects(Os.schema.name).filtered('name CONTAINS $0', "indows");
debug_log(
    foundContain, 'Filter Contain * indows'
);

realm.removeAllListeners();
realm.close();
