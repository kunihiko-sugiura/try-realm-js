import Realm from "realm";
import ShortId from "shortid";
import Os from './models/Os';
import Company from './models/Company';

Realm.defaultPath = './db/app.realm';
const config = {
    schema: [Os, Company]
};
let db = new Realm(config);

// 全てのデータを消す
db.write(() => {
    db.deleteAll();
});

db.write(() => {
    db.create('Company', {
        id:ShortId.generate(),
        name: 'Apple'
    });
    db.create('Company', {
        id:ShortId.generate(),
        name: 'Micro Soft'
    });
});

let companyApple = db.objects('Company').filtered('name = "Apple"').slice(0, 1);
let companyMs = db.objects('Company').filtered('name = "Micro Soft"').slice(0, 1);


// Create Realm objects and write to local storage
db.write(() => {
    db.create('Os', {
        id: ShortId.generate(),
        name:    'Windows98',
        version: '98',
        company: companyMs[0],
        year:    1998
    });
    db.create('Os', {
        id: ShortId.generate(),
        name:    'Windows10',
        version: '10',
        company: companyMs[0],
        year:    2015
    });
    let sierra = db.create('Os', {
        id: ShortId.generate(),
        name:    'macOS Sierra',
        version: '10.12',
        company: companyApple[0],
        year:    2014
    });
    // ** Update
    sierra.year += 2;

    // ** insert
    db.create('Os', {
        id: ShortId.generate(),
        name:    'OS X El Capitan',
        version: '10.11',
        company: companyApple[0],
        year:    2015
    });

    db.create('Os', {
        id: ShortId.generate(),
        name:    'OS X Yosemite',
        version: '10.10',
        company: companyApple[0],
        year:    2014
    });
});

let oses = db.objects('Os').filtered('year >= 2014');
console.log(oses);






// // Add another car
// db.write(() => {
//
//
//
//     let myCar = realm.create('Car', {
//         make: 'Ford',
//         model: 'Focus',
//         miles: 2000,
//     });
//
//
// });
//
// // Query results are updated in realtime
// console.log(cars.length);





db.close();
