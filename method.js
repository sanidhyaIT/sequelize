let Empl = require("./seq_config");
let transporter = require("./nodemailer");
let client = require("./sms");


const sendEmail = async () => {
  try {
  let employees = await Empl.findAll();
  employees.forEach((employee) => {
    const today = new Date();
  const dob = new Date(employee.dob);  
         if (
              dob.getMonth() === today.getMonth() &&
              dob.getDate() === today.getDate()
          ) {
         const mailOptions = {
           from: process.env.GMAIL_USER,
           to: employee.email,
           subject: "Happy Birthday!",
           text: `Happy Birthday, ${employee.empname} Best wishes!!`,
          
    };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });
        client.messages
          .create({
            from: process.env.TWILIO_FROM_NUMBER,
            to: "+917000841956",
            body: `Happy Birthday, ${employee.empname}`,
           
          })  
          .then((message) => console.log(message.sid))
          .catch((error) => console.error(error));
      }
    });
  } catch (err) {
    console.error("Error fetching employees:", err);
  }
};

const getEmp = async (req, res) => {
  try {
    let result = await Empl.findAll();
    res.send(result);
  } catch (err) {
    res.send("Error", err);
  }
};

const postEmp = async (req, res) => {
  let { empid, empname, city, salary, dob, mobile_no, email } =
    req.body;
  try {
    let result = await Empl.create({
      empid,
      empname,
      city,
      salary,
      dob,
      mobile_no,
      email,
    });
    res.send(result);
  } catch (err) {
    res.send("Error", err);
  }
};

const deleteEmp = async (req, res) => {
  const empid = req.params.empid;
  try {
    const result = await Empl.destroy({ where: { empid: empid } });
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

const updateEmp = async (req, res) => {
  const empid = req.params.empid;
  const updates = req.body;
  try {
    const result = await Empl.update(updates, { where: { empid: empid } });
    res.status(result);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getEmp, postEmp, deleteEmp, updateEmp, sendEmail };
