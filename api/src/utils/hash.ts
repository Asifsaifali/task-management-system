import bcrypt from 'bcrypt';


const SALT_ROUNDS = 10;

export const hashPassword = async(password:string): Promise<string> =>{
    const hashPassword  = await bcrypt.hash(password, SALT_ROUNDS);
    return hashPassword;
}

export const comparePassword  = async(password:string, hashedPassword:string): Promise<boolean> =>{
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}