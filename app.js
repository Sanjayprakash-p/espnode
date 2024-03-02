// const http = require('http');
// const gpio = require('rpi-gpio');

// const ledPin = 2; // GPIO pin number connected to the LED

// // Set up GPIO pin for output
// gpio.setup(ledPin, gpio.DIR_OUT, () => {
//   console.log('GPIO pin setup complete');
// });

// // Create HTTP server
// const server = http.createServer((req, res) => {
//   if (req.url === '/led') {
//     // Toggle the LED state
//     gpio.read(ledPin, (err, value) => {
//       if (err) {
//         console.error('Error reading GPIO pin:', err);
//         res.statusCode = 500;
//         res.end('Internal Server Error');
//       } else {
//         const newState = value === gpio.HIGH ? gpio.LOW : gpio.HIGH;
//         gpio.write(ledPin, newState, err => {
//           if (err) {
//             console.error('Error writing GPIO pin:', err);
//             res.statusCode = 500;
//             res.end('Internal Server Error');
//           } else {
//             console.log('LED state toggled');
//             res.end(newState === gpio.HIGH ? 'on' : 'off');
//           }
//         });
//       }
//     });
//   } else {
//     res.statusCode = 404;
//     res.end('Not Found');
//   }
// });

// const port = 3000; // Port number for the server
// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });



// const express = require('express');
// const bodyParser = require('body-parser');
// const cors=require('cors')
// const app = express();
// const PORT = 3000;

// // Body parser middleware to parse JSON requests
// app.use(cors());
// app.use(bodyParser.json());

// // Initial states of the LEDs
// let ledStates = {
//   led1: 'OFF',
//   led2: 'OFF'
// };

// // Endpoint to get the state of all LEDs
// app.get('/control', (req, res) => {
//   res.json(ledStates); // Respond with the current states of all LEDs
// });

// // Endpoint to set the state of a specific LED
// app.post('/control/:led/:state', (req, res) => {
//   const led = req.params.led.toLowerCase();
//   const state = req.params.state.toUpperCase();

//   // Check if the LED name is valid
//   if (!ledStates.hasOwnProperty(led)) {
//     return res.status(400).send('Invalid LED name.');
//   }

//   // Check if the state is valid
//   if (state !== 'ON' && state !== 'OFF') {
//     return res.status(400).send('Invalid state. Please use ON or OFF.');
//   }

//   // Set the state of the LED
//   ledStates[led] = state;
//   console.log(`LED ${led} state set to: ${state}`);
//   res.send(`LED ${led} state set to: ${state}`);
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const cors= require('cos')
const app = express();
const PORT = 3000;
app.use(cors())
app.use(bodyParser.json());
let ledState = 'OFF'; // Initial state of the LED
let servoAngle = 50;
app.get('/control', (req, res) => {
  console.log("request received")
  res.send(ledState); // Respond with the current state of the LED
});

app.post('/control/:state', (req, res) => {
  const newState = req.params.state.toUpperCase();
  if (newState === 'ON' || newState === 'OFF') {
    ledState = newState;
    console.log(`LED state set to: ${ledState}`);
    res.send(`LED state set to: ${ledState}`);
  } else {
    res.status(400).send('Invalid state. Please use ON or OFF.');
  }
});
app.post('/servo', (req, res) => {
  const { angle } = req.body;
  if (typeof angle === 'number' && angle >= 0 && angle <= 180) {
    servoAngle = angle; // Update servo angle
    res.send(`Servo angle set to: ${angle}`);
  } else {
    res.status(400).send('Invalid servo angle. Angle should be a number between 0 and 180.');
  }
});
app.get('/servo', (req, res) => {
  console.log(servoAngle);
  res.send({ angle: servoAngle });
});
app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
});
