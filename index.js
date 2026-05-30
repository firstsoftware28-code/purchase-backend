const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

/* =========================
   DATABASE CONNECTION TEST
========================= */
prisma.$connect()
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((err) => {
    console.error("DATABASE ERROR:", err);
  });

/* =========================
   TEST ROUTE
========================= */
app.get("/", async (req, res) => {
  try {
    const count = await prisma.purchase.count();

    res.json({
      message: "Backend Running",
      totalEntries: count,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
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
    const body = req.body;

    const data = await prisma.purchase.create({
      data: {
        date: body.date || "",
        description: body.description || "",

        rate: Number(body.rate) || 0,
        qty: Number(body.qty) || 0,
        amount: Number(body.amount) || 0,

        company: body.company || "",
        project: body.project || "",
        partyName: body.partyName || "",
        partyNumber: body.partyNumber || "",

        givenPayment: Number(body.givenPayment) || 0,
        remainingPayment: Number(body.remainingPayment) || 0,

        status: body.status || "Pending",
        note: body.note || "",
      },
    });

    res.status(201).json(data);
  } catch (error) {
    console.error("CREATE ERROR:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});

/* =========================
   UPDATE ENTRY
========================= */
app.put("/entries/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const body = req.body;

    const updated = await prisma.purchase.update({
      where: { id },
      data: {
        date: body.date,
        description: body.description,

        rate: Number(body.rate) || 0,
        qty: Number(body.qty) || 0,
        amount: Number(body.amount) || 0,

        company: body.company,
        project: body.project,
        partyName: body.partyName,
        partyNumber: body.partyNumber,

        givenPayment: Number(body.givenPayment) || 0,
        remainingPayment: Number(body.remainingPayment) || 0,

        status: body.status,
        note: body.note,
      },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
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
      error: error.message,
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