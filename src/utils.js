export function generateSixDigitId() {
    const possibleDigits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    while (code.length < 6) {
        code += possibleDigits[Math.floor(Math.random() * possibleDigits.length)];
    }
    console.log('generated code: ', code);
    return code;
}