#include "Arduino.h"
#include "radar.h"
#include "Wire.h"
#include "moving_average.h"

#ifdef ARDUINO_AVR_NANO

#define trigPin 3
#define echoPin 2

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
}

void Radar::print()
{
  Serial.print("Raw distance: ");
  Serial.print(lastDistance);
  Serial.print("\tMoving average: ");
  Serial.println(movingAverage.get());
}

#endif

#ifdef ESP32

#endif