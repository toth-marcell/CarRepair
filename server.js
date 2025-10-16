import express from "express";
import { CarModel, Customer, Job } from "./models.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.get("/customer", async (req, res) => {
  res.json(await Customer.findAll());
});

app.post("/customer", async (req, res) => {
  const { name, address, birthDate, phone } = req.body;
  if (!(name && address && birthDate && phone))
    return res.status(400).json({ msg: "You must fill out all fields!" });
  await Customer.create({ name, address, birthDate, phone });
  res.json({ msg: "Success!" });
});

app.delete("/customer/:id", async (req, res) => {
  const customer = await Customer.findByPk(req.params.id);
  if (!customer) return res.status(404).json({ msg: "No such customer!" });
  await customer.destroy();
  res.json({ msg: "Success!" });
});

app.get("/carmodel", async (req, res) => {
  res.json(await CarModel.findAll());
});

app.post("/carmodel", async (req, res) => {
  const { make, model, year, type } = req.body;
  if (!(make && model && year && type))
    return res.status(400).json({ msg: "You must fill out all fields!" });
  await CarModel.create({ make, model, year, type });
  res.json({ msg: "Success!" });
});

app.delete("/carmodel/:id", async (req, res) => {
  const carmodel = await CarModel.findByPk(req.params.id);
  if (!carmodel) return res.status(404).json({ msg: "No such car model!" });
  await carmodel.destroy();
  res.json({ msg: "Success!" });
});

app.get("/job", async (req, res) => {
  res.json(await Job.findAll({ include: [Customer, CarModel] }));
});

app.post("/job", async (req, res) => {
  const { description, price, licensePlate, deadline, CustomerId, CarModelId } =
    req.body;
  if (
    !(
      description &&
      price &&
      licensePlate &&
      deadline &&
      CustomerId &&
      CarModelId
    )
  )
    return res.status(400).json({ msg: "You must fill out all fields!" });
  const customer = await Customer.findByPk(CustomerId);
  if (!customer) return res.status(404).json({ msg: "No such customer!" });
  const carmodel = await CarModel.findByPk(CarModelId);
  if (!carmodel) return res.status(404).json({ msg: "No such car model!" });
  await Job.create({
    description,
    price,
    licensePlate,
    deadline,
    CustomerId,
    CarModelId,
  });
  res.json({ msg: "Success!" });
});

app.delete("/job/:id", async (req, res) => {
  const job = await Job.findByPk(req.params.id);
  if (!job) return res.status(404).json({ msg: "No such job!" });
  await job.destroy();
  res.json({ msg: "Success!" });
});

const port = 3000;
app.listen(port, () => console.log(`Listening: http://localhost:${port}`));
