import  CryptoJs from "crypto-js"



export const encryptPassword = (password:string) => {
    const encryptPass = CryptoJs.AES.encrypt(password, process.env.AES_SECRET).toString();
    return encryptPass
}
export const decryptPassword = (password: string) => {
    const dcryptPass = CryptoJs.AES.decrypt(password, process.env.AES_SECRET).toString(CryptoJs.enc.Utf8)
    return dcryptPass
}
