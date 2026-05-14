const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");

const { port, cors: corsCfg, nodeEnv } = require("./config/env");
const { pingDb } = require("./db");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const chatRoutes = require("./routes/chatRoutes");
const adminRoutes = require("./routes/adminRoutes");
const publicRoutes = require("./routes/publicRoutes");

const app = express();

app.set("trust proxy", 1);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        "connect-src": ["'self'", "http://localhost:5000", "http://127.0.0.1:5000"],
      },
    },
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true, // Reflect request origin
    credentials: true,
  })
);
app.use(morgan(nodeEnv === "production" ? "combined" : "dev"));

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 120,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  })
);

app.get("/health", async (req, res, next) => {
  try {
    await pingDb();
    res.json({ ok: true });
  } catch (e) {
    e.statusCode = 500;
    next(e);
  }
});

app.use("/chat", chatRoutes);
app.use("/", publicRoutes);
app.use("/admin", adminRoutes);

const frontendDir = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendDir));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend running on http://localhost:${port}`);
});

