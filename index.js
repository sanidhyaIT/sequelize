let express = require("express");
let cron = require("cron");
let { getEmp, postEmp, deleteEmp, updateEmp, sendEmail } = require("./method");
let app = express();
app.use(express.json());

let empRouter = express.Router();

empRouter.get("/", getEmp);
empRouter.post("/post", postEmp);
empRouter.delete("/:empid", deleteEmp);
empRouter.patch("/:empid", updateEmp);

const job = new cron.CronJob(" 00 0 * * * " , () => {
  sendEmail();
});
job.start();

app.use("/emp", empRouter);
app.listen(5000, () => {
  console.log("server started");  
});