import app from "./app.js";
import noteRoutes from "./routes/note.routes.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
app.use("/api/notes", noteRoutes);
