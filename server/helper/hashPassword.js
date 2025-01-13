import bcrypt from "bcrypt";
const saltRounds = 10;

export const hashPassword = async(password) =>{
  try {
   const hashedPassword = await bcrypt.hash(password, saltRounds);
   return hashedPassword;

  } catch (error) {
    console.log(error);
  }
}


export const comparePassword = async(password, hashedPassword) => {
   try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
 
   } catch (error) {
     console.log(error);
   }
}