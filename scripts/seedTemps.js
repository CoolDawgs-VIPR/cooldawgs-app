const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const mongoose = require("mongoose");

// === 1) Connection string ==============================
// Prefer MONGODB_URI from scripts/.env; fallback to a REAL URI (edit if needed)
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://KrisPitshugin:pKnGQpV8GwHXbjKR@cooldawgs-cluster1.qrigh6d.mongodb.net/test?retryWrites=true&w=majority&appName=CoolDawgs-Cluster1";

// === 2) Seeding config (can also be set via .env) ======
const OWNER = process.env.OWNER || "kris";
const PET = process.env.PET || "Bob";
const HOURS = Number(process.env.HOURS || 24); // how many hours back
const INTERVAL_MIN = Number(process.env.INTERVAL_MIN || 15); // one doc every N minutes

// === 3) Mongoose schema (matches your Backend/model/Temp.js) ===
const tempSchema = new mongoose.Schema({
  Temp: { type: Number, required: true },
  ownerUsername: { type: String, required: true },
  Timestamp: { type: Date, required: true, index: true },
  petName: { type: String, required: true },
});
const Temp = mongoose.models.temp || mongoose.model("temp", tempSchema); // collection: temps

// === 4) Generator for realistic temperature series =====
function* generateSeries({ hours, intervalMin, base = 36.6, amp = 0.6 }) {
  const now = Date.now();
  const start = now - hours * 60 * 60 * 1000;
  const step = intervalMin * 60 * 1000;

  for (let t = start; t <= now; t += step) {
    // small daily wave + a little random jitter
    const hFromStart = (t - start) / (60 * 60 * 1000);
    const wave = amp * Math.sin((2 * Math.PI * hFromStart) / 24);
    const jitter = (Math.random() - 0.5) * 0.25; // ±0.125°C
    const tempC = Number((base + wave + jitter).toFixed(2));

    yield {
      Temp: tempC,
      ownerUsername: OWNER,
      Timestamp: new Date(t),
      petName: PET,
    };
  }
}

// === 5) Main ==========================================
(async () => {
  try {
    const safe = MONGODB_URI.replace(/:[^@]+@/, ":***@"); // mask password in logs
    console.log("Connecting to", safe);
    await mongoose.connect(MONGODB_URI);
    console.log("Connected.");

    // Optional cleanup: delete any docs for this owner/pet in the last HOURS
    const cutoff = new Date(Date.now() - HOURS * 60 * 60 * 1000);
    const delRes = await Temp.deleteMany({
      ownerUsername: OWNER,
      petName: PET,
      Timestamp: { $gte: cutoff },
    });
    console.log(
      `Cleaned ${delRes.deletedCount ?? 0} recent docs for ${OWNER}/${PET}.`
    );

    // Generate & insert
    const docs = Array.from(
      generateSeries({ hours: HOURS, intervalMin: INTERVAL_MIN })
    );
    const inserted = await Temp.insertMany(docs, { ordered: false });
    console.log(
      `Inserted ${inserted.length} docs into ${mongoose.connection.name}.temps for ${OWNER}/${PET}.`
    );

    await mongoose.disconnect();
    console.log("Done.");
  } catch (e) {
    console.error("Seeding failed:", e);
    try {
      await mongoose.disconnect();
    } catch {
      /* ignore */
    }
    process.exit(1);
  }
})();
