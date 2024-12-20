#include "Arduino.h"
#include "radar.h"
#include "Wire.h"
#include "moving_average.h"
#include "Servo.h"
#include "Stepper.h"

#ifndef GIRA_E_ENROLA

#define trigPin 3
#define echoPin 2
#define servoPin 9

int lastDistance;
int servoAngle = 0;
bool servoAngleDirection = true;

Servo servo;
MovingAverage movingAverage(10);

Radar::Radar()
{
  lastDistance = 0;
}

void Radar::setup()
{
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Wire.begin();
  servo.attach(servoPin);
}

void Radar::loop()
{
  long duration;
  int distance;
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = (duration * 0.034 / 2);
  if (!(distance >= 200 || distance <= 0))
  {
    lastDistance = distance;
    movingAverage.insert(distance);
  }
  delay(10);

  // move servo in 0-180-0 degrees in 1 degree increments
  if (servoAngleDirection)
  {
    servoAngle++;
    if (servoAngle >= 180)
    {
      servoAngleDirection = false;
    }
  }
  else
  {
    servoAngle--;
    if (servoAngle <= 0)
    {
      servoAngleDirection = true;
    }
  }

  servo.writeMicroseconds(map(servoAngle, 0, 180, 700, 2400));
}

void Radar::print()
{
  Serial.print(lastDistance);
  Serial.print(",");
  Serial.print(movingAverage.get());
  Serial.print(",");
  Serial.println(servoAngle);
}

#endif

#ifdef GIRA_E_ENROLA

#define trigPin 3
#define echoPin 2

const int walkAmount = 10;
int totalWalk = 0;
const int stepsPerRevolution = 500;

Stepper myStepper(stepsPerRevolution, 6, 7, 8, 9);

int lastDistance;

MovingAverage movingAverage(10);

Radar::Radar()
{
  lastDistance = 0;
}

void Radar::setup()
{
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Wire.begin();
  myStepper.setSpeed(60);
}

void Radar::loop()
{
  long duration;
  int distance;
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = (duration * 0.034 / 2);
  if (!(distance >= 200 || distance <= 0))
  {
    lastDistance = distance;
    movingAverage.insert(distance);
  }
  delay(10);

  // move servo in 0-180-0 degrees in 1 degree increments
  myStepper.step(walkAmount);
  totalWalk += walkAmount;
}

void Radar::print()
{
  Serial.print(lastDistance);
  Serial.print(",");
  Serial.print(movingAverage.get());
  Serial.print(",");
  Serial.println(totalWalk);
}

#endif