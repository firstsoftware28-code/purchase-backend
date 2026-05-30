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
  res.send("API Running...");
});

/* =========================
   CREATE ENTRY
========================= */
app.post("/entries", async (req, res) => {
  try {
    const body = req.body;

    const entry = await prisma.purchase.create({
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

    res.json(entry);

  } catch (error) {
    console.log("CREATE ERROR:", error);

    res.status(500).json({
      error: "Failed to create entry",
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

    console.log("FETCH ERROR:", error);

    res.status(500).json({
      error: "Failed to fetch entries",
    });
  }
});

/* =========================
   DELETE ENTRY
========================= */
app.delete("/entries/:id", async (req, res) => {
  try {

    await prisma.purchase.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      message: "Deleted Successfully",
    });

  } catch (error) {

    console.log("DELETE ERROR:", error);

    res.status(500).json({
      error: "Delete failed",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});