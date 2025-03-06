import { Request, Response } from "express";
import { signup, login, getProfile } from "../application/services/UserService"; 
import STATUS_CODES from "../shared/constants/statusCodes";
import { RequestWithUser } from "../middlewares/authMiddleware";
import asyncHandler from "../utils/asyncHandler";




export const signupController = asyncHandler (async (req: Request, res: Response) => {

    const { name, email, password } = req.body;

    const user = await signup(name, email, password);

    res.status(STATUS_CODES.CREATED).json({ message: "User created", user });

})



export const loginController = asyncHandler (async (req: Request, res: Response) => {

    const { email, password } = req.body;
    const { user, token } = await login(email, password);

    res.status(STATUS_CODES.OK).json({ user, token });

})



export const getProfileController = asyncHandler (async (req: RequestWithUser, res: Response) => { 

    const user = await getProfile(req.user.id);
    
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "User not found" });
      return;
    }

    res.status(STATUS_CODES.OK).json(user);

})


