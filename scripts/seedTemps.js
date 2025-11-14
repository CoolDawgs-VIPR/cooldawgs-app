require("dotenv").config();
const mongoose = require("mongoose");

// ---------- CONFIG (from .env or defaults) ----------
const MONGODB_URI = process.env.MONGODB_URI; // full Atlas URI
const OWNER = process.env.OWNER || "kris";
const PET = process.env.PET || "Bob";
const HOURS = Number(process.env.HOURS || 24); // how many hours back
const INTERVAL_MIN = Number(process.env.INTERVAL_MIN || 15); // sampling interval

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in .env");
  process.exit(1);
}

// ---------- Temp model (same shape as your backend) ----------
const tempSchema = new mongoose.Schema({
  Temp: { type: Number, required: true },
  ownerUsername: { type: String, required: true },
  Timestamp: { type: Date, required: true, index: true },
  petName: { type: String, required: true },
});
const Temp = mongoose.model("temp", tempSchema);

// ---------- helper to generate plausible temps ----------
function genTempC(hour) {
  // simple daily curve around 36.5–37.5C
  const base = 36.8 + 0.6 * Math.sin((2 * Math.PI * hour) / 24 - Math.PI / 2);
  const noise = (Math.random() - 0.5) * 0.3;
  return Number((base + noise).toFixed(2));
}

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected.");

  const now = new Date();
  const start = new Date(now.getTime() - HOURS * 60 * 60 * 1000);

  // optional: remove existing recent docs for this owner/pet to avoid duplicates
  const removed = await Temp.deleteMany({
    ownerUsername: OWNER,
    petName: PET,
    Timestamp: { $gte: start },
  });
  console.log(
    `Cleaned ${removed.deletedCount} recent docs for ${OWNER}/${PET}.`
  );

  const docs = [];
  for (
    let t = new Date(start);
    t <= now;
    t = new Date(t.getTime() + INTERVAL_MIN * 60 * 1000)
  ) {
    const tempC = genTempC(t.getHours());
    docs.push({
      Temp: tempC,
      ownerUsername: OWNER,
      petName: PET,
      Timestamp: t,
    });
  }

  if (docs.length) {
    await Temp.insertMany(docs);
  }
  console.log(`Inserted ${docs.length} docs for ${OWNER}/${PET}.`);

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
