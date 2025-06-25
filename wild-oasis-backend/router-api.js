const apiRouter = require('express').Router();
const cors = require('cors');

apiRouter.use(cors());

apiRouter.get("/", (req, res) => res.json("Hello, if you see this message that means your backend is up and running successfully."));

module.exports = apiRouter;