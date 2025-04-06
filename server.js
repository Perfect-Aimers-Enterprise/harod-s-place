require('dotenv').config()
const express = require('express');
const cors = require('cors')
// const http = require('http');
const bodyParser = require('body-parser')
const path = require('path')
const connectDB = require('./db/connectDB')
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const orderRoute = require('./routes/orderRoute')
const adminGetOrderRoute = require('./routes/adminGetOrderRoute')
const userMessageRoute = require('./routes/userMessageRoute')
const landingSectionRoute = require('./routes/landingSectionRoute')
const galleryRoute = require('./routes/galleryRoute')
const dailyMenuRoute = require('./routes/dailyMenuRoute')
const adminBookingRoute = require('./routes/adminBookingRoute')
const bookingLoungeRoute = require('./routes/bookingLoungeRoute')
const bakeryRoute = require('./routes/bakeryRoute')

const authentication = require('./middleWare/authentication')
// const { Server } = require('socket.io');

const app = express();

// Middleware to set cache control headers
app.use((req, res, next) => {
  // Set the Cache-Control headers to 'no-store' to prevent caching
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});



// Serve static files
// app.use(express.static('public'));
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/api/test', (req, res) => {
//   res.json({ message: "Server is working!" });
// });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/htmlFolder/haroldsPlace.html');
});

app.get('/haroldsplaceadmin', (req, res) => {
  res.sendFile(__dirname + '/public/htmlFolder/adminDashboard.html');
});

app.get('/reset-password', (req, res) => {
  res.sendFile(__dirname + '/public/htmlFolder/resetPassword.html');
});

// MiddleWares 
app.use('/harolds/api', userRoute)
app.use('/harolds/product', productRoute)
app.use('/harolds/order', authentication, orderRoute)
app.use('/harolds/adminGetOrder', adminGetOrderRoute)
app.use('/harolds/message', userMessageRoute)
app.use('/haroldsLanding', landingSectionRoute)
app.use('/galleryDisplay', galleryRoute)
app.use('/dailyMenuDisplay', dailyMenuRoute)
app.use('/harolds', adminBookingRoute)
app.use('/haroldsUser', bookingLoungeRoute)
app.use('/harolds', bakeryRoute)

// Console logging instead
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
});


const port = process.env.PORT || 3000

const start = async () => {
  try {
      await connectDB(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
      app.listen(port, () => {
          console.log(`Harolds server is listening on port ${port}`);
          
      })
  } catch (error) {
      console.log('error listening to port', error);
      
  }
}

start()



// WebSocket logic

// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   setInterval(() => {
//       const data = { message: 'Real-time update', timestamp: new Date() };
//       socket.emit('update', data);
//   }, 1000);

//   socket.on('disconnect', () => {
//       console.log('A user disconnected:', socket.id);
//   });
// });