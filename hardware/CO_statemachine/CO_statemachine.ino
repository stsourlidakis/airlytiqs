// state machine for required heating cycles 

#define heater 9
#define CO A3


int CORaw;
int COppm;
bool hotState, readyToMeas;    
unsigned long previousMillis = 0;
long OnTime = 5000;           // milliseconds of on-time
long OffTime = 1000;          // milliseconds of off-time


//Calculate CO PPM
int CO_ppm(double rawValue) {
  double ppm = 3.027 * exp(1.0698 * (rawValue * 5 / 1023));
  return ppm;
}


void setup() 
{
  Serial.begin(9600);   
  pinMode(heater, OUTPUT);      
}

void loop()
{
  unsigned long currentMillis = millis();
  if((hotState) && (currentMillis - previousMillis >= OnTime))
  {
    hotState = false; 
    readyToMeas = true;
    previousMillis = currentMillis;
    analogWrite(heater, 80);
    Serial.println("cold");
  }
  else if ((!hotState) && (currentMillis - previousMillis >= OffTime))
  {
    hotState = true;
    readyToMeas = false;
    Serial.println("hot");

    previousMillis = currentMillis;
    digitalWrite(heater, HIGH);
  }

  if (readyToMeas){
    readyToMeas = false;
    CORaw = analogRead(CO);
    COppm = CO_ppm(CORaw);
    Serial.println("took measurement");
    Serial.print("ADC: ");
    Serial.print(CORaw);
    Serial.print("\t\t ppm: ");
    Serial.print(COppm);
  }


}