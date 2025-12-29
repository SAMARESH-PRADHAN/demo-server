import { createUser, findUser } from "../services/auth.service.js";
import { sendResponse } from "../utils/response.js";

export const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await createUser(email, password);
  sendResponse(res, 201, "Signup successful", user);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser(email, password);

  if (!user) {
    return sendResponse(res, 401, "Invalid credentials");
  }
  sendResponse(res, 200, "Login successful", user);
};
