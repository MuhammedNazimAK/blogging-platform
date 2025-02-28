import { Request, Response } from "express";
import { signup, login, getProfile } from "../application/services/UserService"; 
import STATUS_CODES from "../shared/constants/statusCodes";
import { RequestWithUser } from "../middlewares/authMiddleware";



export const signupController = async (req: Request, res: Response) => {
  try {

    const { name, email, password } = req.body;

    const user = await signup(name, email, password);

    res.status(STATUS_CODES.CREATED).json({ message: "User created", user });

  } catch (error) {

    res.status(STATUS_CODES.BAD_REQUEST).json({ message: (error as Error).message });
  }
};


export const loginController = async (req: Request, res: Response) => {

  try {

    const { email, password } = req.body;
    const { user, token } = await login(email, password);

    res.status(STATUS_CODES.OK).json({ user, token });

  } catch (error) {
    res.status(STATUS_CODES.UNAUTHORIZED).json({ message: (error as Error).message });
  }
};


export const getProfileController = async (req: RequestWithUser, res: Response) => {
  try { 

    const user = await getProfile(req.user.id);
    if (!user) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "User not found" });
      return;
    }
      

    res.status(STATUS_CODES.OK).json(user);

  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_SERVER).json({ message: (error as Error).message });
  }
};


