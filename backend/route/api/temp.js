const express = require("express");
const router = express.Router();

const Temp = require("../../model/Temp");

/**
 * GET /api/temps
 * Get all temperature entries with optional filters: ownerUsername, petName
 */
router.get("/", async (req, res) => {
  try {
    const { ownerUsername, petName } = req.query;
    const q = {};
    if (ownerUsername) q.ownerUsername = ownerUsername;
    if (petName) q.petName = petName;

    const temps = await Temp.find(q).sort({ Timestamp: -1 });
    res.json(temps);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch temps" });
  }
});

/**
 * to be used for the graph
 * GET /api/temps/range?from=ISO&to=ISO[&ownerUsername=..&petName=..]
 * Temps between from..to (inclusive), sorted asc by time
 */
router.get("/range", async (req, res) => {
  try {
    const { from, to, ownerUsername, petName } = req.query;
    if (!from || !to) {
      return res
        .status(400)
        .json({ error: 'Both "from" and "to" are required (ISO strings)' });
    }

    const fromDate = parseISOOrBadRequest(from, res, "from");
    if (!fromDate) return;
    const toDate = parseISOOrBadRequest(to, res, "to");
    if (!toDate) return;

    const q = { Timestamp: { $gte: fromDate, $lte: toDate } };
    if (ownerUsername) q.ownerUsername = ownerUsername;
    if (petName) q.petName = petName;

    const temps = await Temp.find(q).sort({ Timestamp: 1 });
    res.json(temps);
  } catch (err) {
    res.status(500).json({ error: "Unable to query range" });
  }
});

/**
 * GET /api/temps/since?since=ISO[&ownerUsername=..&petName=..]
 * Temps since a given time (inclusive), sorted asc
 */
router.get("/since", async (req, res) => {
  try {
    const { since, ownerUsername, petName } = req.query;
    if (!since) {
      return res.status(400).json({ error: '"since" is required' });
    }

    const sinceDate = parseISOOrBadRequest(since, res, "since");
    if (!sinceDate) return;

    const q = { Timestamp: { $gte: sinceDate } };
    if (ownerUsername) q.ownerUsername = ownerUsername;
    if (petName) q.petName = petName;

    const temps = await Temp.find(q).sort({ Timestamp: 1 });
    res.json(temps);
  } catch (err) {
    res.status(500).json({ error: "Unable to query since" });
  }
});

/**
 * GET /api/temps/latest[?ownerUsername=..&petName=..]
 * Most recent entry - to be used for "current temperature"
 */
router.get("/latest", async (req, res) => {
  try {
    const { ownerUsername, petName } = req.query;
    const q = {};
    if (ownerUsername) q.ownerUsername = ownerUsername;
    if (petName) q.petName = petName;

    const latest = await Temp.find(q).sort({ Timestamp: -1 }).limit(1);
    if (!latest.length)
      return res
        .status(404)
        .json({ noTempFound: "No temperature entry found" });
    res.json(latest[0]);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch latest" });
  }
});

/**
 * GET /api/temps/avg24h[?ownerUsername=..&petName=..]
 * Average temperature per hour for the last 24 hours.
 * Returns array of { hourISO, avgTemp, count }
 */
router.get("/avg24h", async (req, res) => {
  try {
    const { ownerUsername, petName } = req.query;

    const now = new Date();
    const past24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const match = { Timestamp: { $gte: past24h } };
    if (ownerUsername) match.ownerUsername = ownerUsername;
    if (petName) match.petName = petName;

    const results = await Temp.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            year: { $year: "$Timestamp" },
            month: { $month: "$Timestamp" },
            day: { $dayOfMonth: "$Timestamp" },
            hour: { $hour: "$Timestamp" },
          },
          avgTemp: { $avg: "$Temp" },
          count: { $sum: 1 },
          anyTime: { $first: "$Timestamp" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.hour": 1 } },
    ]);

    const formatted = results.map((r) => {
      // Normalize to the top of the hour for a clean ISO label
      const t = new Date(r.anyTime);
      t.setMinutes(0, 0, 0);
      return {
        hourISO: t.toISOString(),
        avgTemp: Number(r.avgTemp.toFixed(2)),
        count: r.count,
      };
    });
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Unable to compute hourly averages" });
  }
});

/**
 * PUT /api/temps/:id
 * Update entry for a case if there is no entry- make something constant like 0.
 */
router.put("/:id", async (req, res) => {
  try {
    if (req.body.Timestamp && typeof req.body.Timestamp === "string") {
      const d = new Date(req.body.Timestamp);
      if (Number.isNaN(d.getTime())) {
        return res
          .status(400)
          .json({ error: "Invalid Timestamp: expected ISO datetime string" });
      }
      req.body.Timestamp = d;
    }

    const temp = await Temp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ msg: "Temperature entry updated successfully", data: temp });
  } catch (err) {
    res.status(400).json({ error: "Unable to update temperature entry" });
  }
});

/**
 * DELETE /api/temps/:id
 * Delete entry
 */
router.delete("/:id", async (req, res) => {
  try {
    await Temp.findByIdAndDelete(req.params.id);
    res.json({ msg: "Temperature entry deleted successfully" });
  } catch (err) {
    res.status(404).json({ error: "No such temperature entry" });
  }
});

module.exports = router;
