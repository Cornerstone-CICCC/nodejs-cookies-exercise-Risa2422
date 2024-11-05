import { Router, Request, Response } from "express";
import { checkLoginAuth } from "../middleware/auth";

const pageRouter = Router();

interface User {
  username: string;
  password: string;
}

interface UserRequestBody extends User {}

let users: User[] = [{ username: "admin", password: "admin12345" }];

// Home route
pageRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h1>This is your home</h1>");
});

// Login route
pageRouter.get("/login", checkLoginAuth, (req: Request, res: Response) => {
  res.status(200).render("login");
});

// Login post
pageRouter.post(
  "/login",
  (req: Request<{}, {}, UserRequestBody>, res: Response) => {
    const { username, password } = req.body;
    console.log(req.body);
    const found = users.find(
      (user) => user.username === username && user.password === password
    );

    if (found) {
      res.cookie(
        "user_info",
        JSON.stringify({
          username: found.username,
          password: found.password,
        }),
        {
          maxAge: 3 * 60 * 1000,
          httpOnly: true,
        }
      );

      res.redirect("/profile");
    } else {
      res.redirect("/login");
    }
  }
);

pageRouter.get("/profile", (req: Request, res: Response) => {
  res.status(200).render("profile");
});

// Logout
pageRouter.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("user_info");
  res.redirect("/");
});

export default pageRouter;
