export async function errorPage(){
    const fetchRes = await fetch('https://uw.rs/lol.txt')
const notFoundPage = await fetchRes.text()
return notFoundPage
}
export function isValidURL(url : any) {
    var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  }
export function simpleDecode(binaryString: string): string {
    binaryString = binaryString.replace(/o/g, '0').replace(/l/g, '1');
    const decimalValue = parseInt(binaryString, 2).toString(10);
    const resultString = Buffer.from(decimalValue, 'hex').toString('utf-8');
    return resultString;
}
export function simpleEncode(input: string): string {
    const value = Buffer.from(input, 'utf-8').toString('hex');
    const encode = parseInt(value, 10).toString(2);
    return encode.replace(/0/g, 'o').replace(/1/g, 'l');
}
export var crc32=function(r:any){for(var a,o=[],c=0;c<256;c++){a=c;for(var f=0;f<8;f++)a=1&a?3988292384^a>>>1:a>>>1;o[c]=a}for(var n=-1,t=0;t<r.length;t++)n=n>>>8^o[255&(n^r.charCodeAt(t))];return(-1^n)>>>0};