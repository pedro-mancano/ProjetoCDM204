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