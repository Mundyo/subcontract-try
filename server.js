// const mongoose = require('mongoose');
// const express = require('express');
// const FormModel = require('./model/FormModel');
// const bodyParser = require("body-parser");
// const morgan = require("morgan");
// const cors = require('cors');
// const path = require('path');
// const nodemailer = require('nodemailer');
// const multer = require('multer')


// const upload = multer({dest: 'upload/' });
// const app = express();
// const PORT = process.env.PORT || 3001;



//  app.use(cors({
//     origin: 'https://subcontract-frontend-c1acdc80baef.herokuapp.com',
//     credentials: true,
//   }));


// const DB = 'mongodb+srv://Chelsea:Kasongi2014!@cluster0.ali2jhg.mongodb.net/';

// console.log(DB);

// mongoose.set("strictQuery", true);

// const connectDB = async () => {
//   await mongoose.connect(DB, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
    
//   });
//   console.log("Mongodb is connected");
// };

// connectDB();

// app.use(express.urlencoded({ extended: true }));
// app.use(morgan("tiny"));
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));

// const transporter = nodemailer.createTransport({
 
//   service: 'gmail',
//   auth: {
//     user: 'subcontractracker@gmail.com',
//     pass: 'fved inwq xqxq hnhh'
//   }
// });

    
// app.post('/submit-form',upload.single('fileUpload'), async (req, res) => {
//   try {
//     const formData = req.body;
//     const fileData = req.file;

//     console.log('Received form data:', formData);
//     console.log( "Receive file:", fileData);
    
//     const mailOptions ={

//       from: 'subcontractracker@gmail.com',
//       to:   'cowalters20@gmail.com',
//       subject: 'New Form Submission',
//       text: JSON.stringify(formData)
//     }
    
//     try{
//       await transporter.sendMail(mailOptions);
//     }catch(emailError){
//       console.error('error sending the form', emailError)
//       res.status(500).json({error:'Error sending email'});
      
//     }
   

//     const formEntry = new FormModel({
//       ...formData,
//       fileUpload: {
//         data: fileData.buffer,
//         contentType: fileData.mimetype
//       }
//     });

//        await formEntry.save();

//     res.status(201).json({ message: 'Form submitted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.get('/', (req, res) => {
//   res.send('Just chilling');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



const mongoose = require('mongoose');
const express = require('express');
const FormModel = require('./model/FormModel');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;



 app.use(cors({
    origin: true,
    credentials: true,
  }));

const DB = 'mongodb+srv://Chelsea:Kasongi2014!@cluster0.ali2jhg.mongodb.net/';

console.log(DB);

mongoose.set("strictQuery", true);

const connectDB = async () => {
  await mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    
  });
  console.log("Mongodb is connected");
};

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const transporter = nodemailer.createTransport({
 
  service: 'gmail',
  auth: {
    user: 'subcontractracker@gmail.com',
    pass: 'fved inwq xqxq hnhh'
  }
});

    
app.post('/submit-form', async (req, res) => {
  try {
    const formData = req.body;

    console.log('Received form data:', formData);
    
    const mailOptions ={

      from: 'subcontractracker@gmail.com',
      to:   'cowalters20@gmail.com',
      subject: 'New Form Submission',
      text: JSON.stringify(formData)
    }
    
    try{
      await transporter.sendMail(mailOptions);
    }catch(emailError){
      console.error('error sending the form', emailError)
      res.status(500).json({error:'Error sending email'});
      
    }
   

    const formEntry = new FormModel(formData);
    await formEntry.save();

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.send('Just chilling');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});