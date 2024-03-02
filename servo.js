const express = require('express');
const app = express();
const PORT = 3000;
const cors=require('cors');
app.use(cors())

// GPIO pin connected to the servo motor
const servoPin = 5; // Assuming GPIO5 (D1) is used for servo control

// Variables to hold servo configuration
const servoMin = 40; // Minimum pulse length in microseconds
const servoMax = 115; // Maximum pulse length in microseconds
let servoPosition = 90; // Initial position of the servo

// Setup GPIO pins
const { Gpio } = require('pigpio');
const servo = new Gpio(servoPin, { mode: Gpio.OUTPUT });

// Function to set servo position
function setServoPosition(position) {
  if (position < 0) {
    position = 0;
  } else if (position > 180) {
    position = 180;
  }
  // Convert position to pulse width
  const pulseWidth = servoMin + (position / 180) * (servoMax - servoMin);
  servo.servoWrite(pulseWidth);
}

app.get('/control', (req, res) => {
  res.send(servoPosition.toString()); // Respond with the current position of the servo
});

app.post('/control/:position', (req, res) => {
  const newPosition = parseInt(req.params.position);
  if (!isNaN(newPosition) && newPosition >= 0 && newPosition <= 180) {
    servoPosition = newPosition;
    setServoPosition(servoPosition);
    res.send(`Servo position set to: ${servoPosition}`);
  } else {
    res.status(400).send('Invalid position. Position should be an integer between 0 and 180.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
