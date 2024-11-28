#include <Arduino.h>
#include "radar.h"

class MovingAverage
{
private:
  int size;
  float value;
  int inserted;
  bool hasFilled;

public:
  MovingAverage(int size);
  void insert(float value);
  float get();
};

Radar radar;

void setup()
{
  radar.setup();
}

void loop()
{
  radar.loop();
  radar.print();
}