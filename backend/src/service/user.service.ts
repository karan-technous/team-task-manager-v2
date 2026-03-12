import { AppDataSource } from "../config/database"
import { User } from "../entities/User"

const userRepo = AppDataSource.getRepository(User)

export const getUsers = async () => {
  return await userRepo.find()
}

export const storeUserDB = async(data:User)=>{
    return await userRepo.save(data);
}