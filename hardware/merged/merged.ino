#include "gsm_fun.h" // gprs_functions
float Vis, IR, UV;

const int samplingTime = 280;     //** follows http://www.howmuchsnow.com/arduino/airquality/
const int sleepTime = 9680;       //**
byte deltaTime      = 40;         //**

float voMeasured =  0;
float calcVoltage = 0;
float dustDensity = 0;


char packet[64] = 	{'\0'};
char buffer [25] = 	{'\0'};

void setup () {

  Serial.begin(9600);  	// Init UART 96008N1
  pinMode(ledPower, OUTPUT);
  uv.begin();
  modem.begin(9600);		// init NeoSWSerial 96008N1

}

void loop() {
  /* measure first */
  /* measure UV */
  Vis = uv.readVisible();
  IR = uv.readIR();
  UV = uv.readUV();

  Serial.println(Vis);
  Serial.println(IR);
  Serial.println(UV);


  /* UV ********* */
  /* measure dust */
  digitalWrite(ledPower, LOW);           			// LED ON
  delayMicroseconds(samplingTime);
  voMeasured = analogRead(measurePin);  			// ADC value
  delayMicroseconds(deltaTime);
  digitalWrite(ledPower, HIGH);          			// LED ON
  delayMicroseconds(sleepTime);
  calcVoltage = voMeasured * (5.0 / 1024);
  dustDensity = (0.17 * calcVoltage - 0.1) * 1000; // Chris Nafis (c) 2012
  dustDensity += 70;
  /* dust ******* */

  Serial.println(dustDensity); 
  
  itoa (Vis, buffer, 10);
  strcpy(packet, buffer);
  buffer[0] = (char)0;

  itoa (IR, buffer, 10);
  strcat (packet, buffer);
  buffer[0] = (char)0;

  itoa (UV, buffer, 10);
  strcat (packet, buffer);
  buffer[0] = (char)0;

  itoa (dustDensity, buffer, 10);
  strcat (packet, buffer);
  buffer[0] = (char)0;
  for (byte i = 0; i < 255; i++) Serial.print(packet[i]);
  Serial.println();
  while (!ada_fona.begin(modem)) delay(1000); // give time to provider to register us

  byte notRegistered;							// counter to handle registration iterations
  while (get_net_stat() != 1)					// netstat = 1 || 5, depends on SIM provider
  {
    delay(5000);
    notRegistered++;							// increase registration iteration count
    if (notRegistered == 127) 				// arbitary
    {
      Serial.println(F("get_net_stat() failed"));
      notRegistered = 0;
      break;
    }
  }

  /* staff here is power hungry, finish measurements and start afterwards */
  // ******************************************************************************************************************************************************
  ada_fona.setGPRSNetworkSettings(F("internet"),
                                  F(""),
                                  F("")); 	// setup APN
  byte upFail, postFail;						// counters to handle GPRS lock and POST
  bool passedGPRS = false;
  while (!ada_fona.enableGPRS(true))
  {
    upFail++;									// increase GPRS lock iteration count
    delay(1000);
    if (upFail == 127)						// arbitary
    {
      Serial.println(F("GPRS lock failed"));
      upFail = 0;
      break;
    }
  } passedGPRS = true;

  for (byte i = 0; i < 254; i++) http_post("http://airlytiqs.cloudapp.net/telemetry", packet); // super scary, will change
  flush_FONA(); // flash NeoSWSerial
  packet[0] = (char)0;

  // ******************************************************************************************************************************************************
}
