import { Router } from "express";

const AuthController = Router();

AuthController.post("/signin", AuthService.signin);
AuthController.post("/signup", AuthService.signup);
