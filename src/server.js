import { createApp } from "./app.js";

const app = createApp();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, () => {
  console.log(`API listening on http://0.0.0.0:${port}`);
});
