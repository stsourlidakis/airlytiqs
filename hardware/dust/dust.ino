/* copied from here
https://github.com/Trefex/arduino-airquality/tree/master/Module_Dust-Sensor
 */

#define measurePin   A0          // Dust sensor voltage output
#define ledPower     10          // dust sensor pwm led pin

const int samplingTime = 280;     //** follows http://www.howmuchsnow.com/arduino/airquality/
const int sleepTime = 9680;       //**  
byte deltaTime      = 40;         //**          

float voMeasured =  0;
float calcVoltage = 0;
float dustDensity = 0;

void setup(){

  Serial.begin(9600);
  pinMode(ledPower,OUTPUT);

}


void loop(){
  
  digitalWrite(ledPower,LOW);           // LED ON
  delayMicroseconds(samplingTime);

  voMeasured = analogRead(measurePin);  // ADC value
  
  delayMicroseconds(deltaTime);
  digitalWrite(ledPower,HIGH);          // LED ON
  delayMicroseconds(sleepTime);

  // 0 - 5.0V mapped to 0 - 1023 integer values 
  calcVoltage = voMeasured * (5.0 / 1024); 
  
  // linear eqaution taken from http://www.howmuchsnow.com/arduino/airquality/
  // Chris Nafis (c) 2012
  dustDensity = (0.17 * calcVoltage - 0.1)*1000; 
  
  Serial.print(F("Raw Signal Value (0-1023): ")); Serial.print(voMeasured);  
  Serial.print(F(" - Voltage: ")); Serial.print(calcVoltage);
  Serial.print(F(" - Dust Density [ug/m3]: ")); Serial.println(dustDensity);

  delay(1000);
}
