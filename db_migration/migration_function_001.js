/**
 * Created by kuni on 2017/03/09.
 */
export default function (oldRealm, newRealm) {
    if (oldRealm.schemaVersion == 0) {
        let oldObjects = oldRealm.objects('Company');
        let newObjects = newRealm.objects('Company');
        // ** 初期値や変換など、何かしら値に対する対応が必要であれば
        for ( let i = 0; i < oldObjects.length; i++ ) {
            newObjects[i].place = '';
        }
    }
}
