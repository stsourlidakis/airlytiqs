#include "gsm_fun.h" // gprs_functions
float Vis, IR, UV, UVindex;

const int samplingTime = 280;     //** follows http://www.howmuchsnow.com/arduino/airquality/
const int sleepTime = 9680;       //**
byte deltaTime      = 40;         //**

float voMeasured =  0;
float calcVoltage = 0;
float dustDensity = 0;


char packet[64] =   {'\0'};
char buffer [25] =  {'\0'};
int CORaw, COppm, dustIndex;

bool hotState, readyToMeas;
unsigned long previousMillis = 0;
long OnTime = 60000;           // milliseconds of on-time
long OffTime = 90000;          // milliseconds of off-time

void setup () {

  Serial.begin(9600);   // Init UART 96008N1
  pinMode(ledPower, OUTPUT);
  pinMode(heater, OUTPUT);
  uv.begin();

  modem.begin(9600);    // init NeoSWSerial 96008N1
  while (!ada_fona.begin(modem)) delay(1000); // give time to provider to register us
  byte notRegistered;                 // counter to handle registration iterations
  while (get_net_stat() != 1)         // netstat = 1 || 5, depends on SIM provider
  {
    delay(250);
    notRegistered++;                  // increase registration iteration count
    if (notRegistered == 127)         // arbitary
    {
      Serial.println(F("get_net_stat() failed"));
      notRegistered = 0;
      break;
    }
  }

  /* staff here is power hungry */
  // ******************************************************************************************************************************************************
  ada_fona.setGPRSNetworkSettings(F("internet"),F(""),F("")); // setup APN
  byte lockCount;                               // counters to handle GPRS lock and POST
  bool passedGPRS = false;
  while (!ada_fona.enableGPRS(true)){           // keep track of gprs lock status
    lockCount++;                                // increase GPRS lock iteration count
    delay(1000);
    if (lockCount == 127)                       // arbitary
    {
      Serial.println(F("GPRS lock failed"));
      lockCount = 0;
      break;
    }
  } passedGPRS = true;
}

void loop() {

  unsigned long currentMillis = millis(); // timekeeping
  /* measure first */
  /* measure UV */
  float Vis = uv.readVisible();
  float IR = uv.readIR();
  float UV = uv.readUV();
  float UVindex = UV / 100.0;
  /* UV ********* */

  /* dust */
  dustDensity = dust_measure(samplingTime, deltaTime, sleepTime);
  if (dustDensity <= 0.5) dustIndex = 0;                          // arb. dust index
  else if (dustDensity > 0.5 && dustDensity <= 15) dustIndex = 1; // arb. dust index  
  else if (dustDensity > 15 && dustDensity <= 400) dustIndex = 3; // arb. dust index
  else dustIndex = 5;
  /* dust */

  /* CO */
  if ((hotState) && (currentMillis - previousMillis >= OnTime)) { /* heat */
    hotState = false;
    readyToMeas = true;
    analogWrite(heater, 80);
    previousMillis = currentMillis;
  }
  else if ((!hotState) && (currentMillis - previousMillis >= OffTime)) { /* cool */
    hotState = true;
    readyToMeas = false;
    digitalWrite(heater, HIGH);
    previousMillis = currentMillis;
  }
  if (readyToMeas) { /* if sensor hot-cold cycled, measure */
    readyToMeas = false;
    CORaw = analogRead(CO);
    COppm = CO_ppm(CORaw);
  }
  /* CO */

  /* then pack */
  itoa (UV, buffer, 10);
  strcpy(packet, buffer);
  strcat(packet, ",");
  buffer[0] = (char)0;

  pack_and_flush(IR, buffer, packet);
  pack_and_flush(Vis, buffer, packet);
  pack_and_flush(UVindex, buffer, packet);
  pack_and_flush(dustDensity, buffer, packet);
  pack_and_flush(dustIndex, buffer, packet);
  pack_and_flush(CORaw, buffer, packet);

  itoa (COppm, buffer, 10);
  strcat(packet, buffer);
  buffer[0] = (char)0;
  /* then pack */

  /* packet ready */
  // for (byte i = 0; i < 64; i++) Serial.print(packet[i]);
  http_post("http://airlytiqs.cloudapp.net/telemetry", packet);
  flush_FONA(); // flash NeoSWSerial
  packet[0] = (char)0;
  // ******************************************************************************************************************************************************
}


