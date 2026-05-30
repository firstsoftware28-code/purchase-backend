const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.json({
    message: "Purchasing Backend Running"
  });
});

/* =========================
   GET ALL ENTRIES
========================= */
app.get("/entries", async (req, res) => {
  try {
    const entries = await prisma.purchase.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.json(entries);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch entries",
    });
  }
});

/* =========================
   GET SINGLE ENTRY
========================= */
app.get("/entries/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const entry = await prisma.purchase.findUnique({
      where: { id },
    });

    if (!entry) {
      return res.status(404).json({
        error: "Entry not found",
      });
    }

    res.json(entry);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch entry",
    });
  }
});

/* =========================
   CREATE ENTRY
========================= */
app.post("/entries", async (req, res) => {
  try {
    const data = await prisma.purchase.create({
      data: req.body,
    });

    res.status(201).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create entry",
    });
  }
});

/* =========================
   UPDATE ENTRY
========================= */
app.put("/entries/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const updated = await prisma.purchase.update({
      where: { id },
      data: req.body,
    });

    res.json(updated);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update entry",
    });
  }
});

/* =========================
   DELETE ENTRY
========================= */
app.delete("/entries/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.purchase.delete({
      where: { id },
    });

    res.json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Delete failed",
    });
  }
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});