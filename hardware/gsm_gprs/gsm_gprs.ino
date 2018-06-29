#include "gsm_fun.h" // gprs_functions

void setup()
{
	Serial.begin(9600);  	// Init UART 96008N1
	modem.begin(9600);		// init NeoSWSerial 96008N1
	delay(2000);

}


void loop(){

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

	char packet[] = "123"; // placeholder for sensor data
    for (byte i = 0; i<254; i++) http_post("http://airlytiqs.cloudapp.net/telemetry", packet); // super scary, will change
    flush_FONA(); // flash NeoSWSerial
// ******************************************************************************************************************************************************

}
