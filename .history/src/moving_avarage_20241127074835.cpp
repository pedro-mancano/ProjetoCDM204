#include "moving_average.h"

MovingAverage::MovingAverage(int size)
{
  this->size = size;
  this->value = 0;
  this->inserted = 0;
  this->hasFilled = false;
}

void MovingAverage::insert(float value)
{
  if (this->inserted < this->size)
  {
    this->value += value / this->size;
    this->inserted++;
  }
  else
  {
    this->value = this->value - (this->value / this->size) + value;
    this->hasFilled = true;
  }
}

float MovingAverage::get()
{
  if (this->hasFilled)
  {
    return this->value / this->size;
  }
  else
  {
    return this->value / this->inserted;
  }
}
