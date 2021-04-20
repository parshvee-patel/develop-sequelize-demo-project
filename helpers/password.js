import bcrypt from "bcrypt"
const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_ROUNDS

const encryptPassword = async(password) => {
    const encPassword = await bcrypt.hash(
        password,
        parseInt(BCRYPT_SALT_ROUNDS)
    )
    return encPassword
}

const passwordfunction = {
    encryptPassword,
}

export { passwordfunction }