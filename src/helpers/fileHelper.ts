export async function getDataFromFile(file: File): Promise<any> {
    const arrBuf = await file.arrayBuffer();
    const enc = new TextDecoder('utf-8');
    const arr = new Uint8Array(arrBuf);
    const decodedData = enc.decode(arr);
    const output = JSON.parse(decodedData);
    return output
}