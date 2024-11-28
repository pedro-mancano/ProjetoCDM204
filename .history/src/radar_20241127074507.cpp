#include "Arduino.h"
#include "radar.h"
#include "Wire.h"

#ifdef ARDUINO_AVR_NANO

#define trigPin 3
#define echoPin 2

int lastDistance;

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
  distance = (duration / 2) / 29.1;
  if (!(distance >= 200 || distance <= 0))
  {
    lastDistance = distance;
  }
  delay(200);
}

void Radar::print()
{
  Serial.print("Distance: ");
  Serial.println(lastDistance);
}

#endif

#ifdef ESP32

#endif