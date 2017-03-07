import Realm from "realm";
import ShortId from "shortid";
import Os from './models/Os';
import Company from './models/Company';

// TODO: Schema Version
// TODO: Migrations

// Realm.defaultPath = './db/app.realm';
const config = {
    path: './db/app.realm',
    schema: [Os, Company]
};
let realm = new Realm(config);

// Unregister all listeners
realm.removeAllListeners();


// 全てのデータを消す
realm.write(() => {
    realm.deleteAll();
});

realm.write(() => {
    realm.create('Company', {
        id:ShortId.generate(),
        name: 'Apple'
    });
    realm.create('Company', {
        id:ShortId.generate(),
        name: 'Micro Soft'
    });
});

// ** Limiting Results
let companyApple = realm.objects('Company').filtered('name = $0', "Apple").slice(0, 1);
let companyMs = realm.objects('Company').filtered('name = $0', "Micro Soft").slice(0, 1);

// ** Listen Events
realm.objects('Os').addListener((puppies, changes) => {
    changes.insertions.forEach((index) => {
        console.log({
            "! Event Insert Data!!!!!!!!!:" : puppies[index]
        });
    });
    changes.modifications.forEach((index) => {
        console.log({
            "! Event Update Data!!!!!!!!!:" : puppies[index]
        });
    });
    changes.deletions.forEach((index) => {
        console.log({
            "! Event Delete Data!!!!!!!!!:" : puppies[index]
        });
    });
});

let sierra = null;
// Create Realm objects and write to local storage
realm.write(() => {
    realm.create('Os', {
        id: ShortId.generate(),
        name:    'Windows98',
        version: '98',
        company: companyMs[0],
        year:    1998
    });
    realm.create('Os', {
        id: ShortId.generate(),
        name:    'Windows10',
        version: '10',
        company: companyMs[0],
        year:    2015
    });
    sierra = realm.create('Os', {
        id: ShortId.generate(),
        name:    'macOS Sierra',
        version: '10.12',
        company: companyApple[0],
        year:    2014
    });

    console.log({
        "sierra age:" :     sierra.age
    });

    // ** insert
    realm.create('Os', {
        id: ShortId.generate(),
        name:    'OS X El Capitan',
        version: '10.11',
        company: companyApple[0],
        year:    2015
    });

    realm.create('Os', {
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

let oses = realm.objects('Os').filtered('year >= $0', 2014);
console.log({
    "Oses": oses
});

// ** Delete
realm.write(() => {
    realm.delete(sierra);
});

// ** Filter Available comparison operators
// == , != , > , >= , < , <= , BEGINSWITH , ENDSWITH , CONTAINS

// ** Filter BeginWith
let foundBeginWith = realm.objects('Os').filtered('name BEGINSWITH $0', "OS");
console.log({
    'Filter BeginWith':foundBeginWith
});

// ** Filter EndWith
let foundEndWith = realm.objects('Os').filtered('name ENDSWITH $0', "Yosemite");
console.log({
    'Filter BeginWith':foundEndWith
});

// ** Filter Contain
let foundContain = realm.objects('Os').filtered('name CONTAINS $0', "indows");
console.log({
    'Filter Contain':foundContain
});

realm.removeAllListeners();
realm.close();
