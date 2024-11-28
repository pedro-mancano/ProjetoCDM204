#include <Arduino.h>
#include "radar.h"

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