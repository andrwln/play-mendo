const possibleDigits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export function generateUniqueId(length = 6) {
    let code = '';
    while (code.length < length) {
        code += possibleDigits[Math.floor(Math.random() * possibleDigits.length)];
    }
    console.log('generated code: ', code);
    return code;
}

export function generateGameCode() {
    return generateUniqueId(6);
}

export function generateDataId() {
    return generateUniqueId(10);
}

export function snapshotListToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
}
