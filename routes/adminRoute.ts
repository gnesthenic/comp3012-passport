import express, { Request, Response } from "express";
import session from "express-session";
import { ensureAdmin } from "../middleware/checkAdmin";

const router = express.Router();

router.get("/", ensureAdmin, (req: Request, res: Response) => {
  const store = req.sessionStore as session.MemoryStore;

  store.all((err, sessions) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error: Unable to retrieve sessions");
    }

    res.render("adminDashboard", {
      user: req.user,  
      sessions,
    });
  });
});

router.post("/revoke", ensureAdmin, (req: Request, res: Response) => {
    const sessionId = req.body.sessionId;
  
    if (!sessionId) {
      return res.status(400).send("Bad Request: Session ID is required");
    }
  
    const store = req.sessionStore as session.MemoryStore;
  
    store.destroy(sessionId, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server Error: Unable to destroy session");
      }
      res.redirect("/admin");
    });
  });

export default router;