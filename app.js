const express = require('express');
const app = express();
const cors = require('cors'); // <--- add this line
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');

//app.use(cors()); // <--- allow all origins (or restrict below)
/*
app.use(cors({
    origin: 'http://localhost:4300',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  */
  const allowedOrigins = [
    'http://localhost:4300',
    'https://cooldhaval.github.io/'
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
const companyRoutes = require('./routes/companyRoutes');
const clientRoutes = require('./routes/clientRoutes');
const schemeRoutes = require('./routes/schemeRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const clientcompanyRoutes = require('./routes/clientCompanyRoutes');
const clientReturnPlanRoutes = require('./routes/clientReturnPlanRoutes');
const clientCompanyInvestmentMatrixReportRoutes = require('./routes/clientCompanyInvestmentMatrixReportRoutes');

app.use(bodyParser.json());

app.use('/api', companyRoutes);
app.use('/api', clientRoutes);
app.use('/api', schemeRoutes);
app.use('/api', transactionRoutes);
app.use('/api', clientcompanyRoutes);
app.use('/api', clientReturnPlanRoutes);
app.use('/report', clientCompanyInvestmentMatrixReportRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
