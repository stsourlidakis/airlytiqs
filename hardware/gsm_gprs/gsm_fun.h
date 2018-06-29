#include <NeoSWSerial.h>
#include "Adafruit_FONA.h"
// ******************************************************************************************************************************************************
// pins & variables declaration
#define FONA_RX      2                                                  // SIM800 RX
#define FONA_TX      4                                                  // SIM800 TX
#define FONA_RST     5                                                  // SIM800 RST
NeoSWSerial modem (FONA_TX, FONA_RX);                                   // setup 
                                                                        // NeoSWSerial for SIM800
Adafruit_FONA ada_fona =        Adafruit_FONA(FONA_RST);                // create modem
// end of variable declaration
// ******************************************************************************************************************************************************
/* flush softWareSerial */
void flush_FONA() {
  char inChar;
  while (modem.available()) {
    inChar = modem.read();
    Serial.write(inChar);
    delay(20);
  }
}

char get_net_stat() {
  uint8_t nn = ada_fona.getNetworkStatus();
  Serial.print(nn);
  Serial.print(F(": "));
  return nn; // 1 is home registerd, 5 is roaming registerd
}

/* clear the UART */
void flush_serial() {
  while (Serial.available())
    Serial.read();
}

/* HTTP POST */ // UDR0 is fukin fast
bool http_post(uint8_t* url, uint8_t* packet) {
  uint16_t statuscode;
  int16_t length;
  bool postOK;
  uint8_t urlz[strlen(url) + 1] = {0};
  strcpy(urlz, url);        // Handles null termination, will test for removing

  flush_serial();
  if (!ada_fona.HTTP_POST_start(urlz, F("text/plain"), (uint8_t *) packet, strlen(packet), &statuscode, (uint16_t *)&length)) {
    Serial.println(F("Failed!"));
    postOK = 0;
  }
  else postOK = 1;

  /* consume response */
  while (length > 0 && postOK) {
    while (ada_fona.available() && postOK) {
      char c = ada_fona.read();
#if defined(__AVR_ATmega328P__) || defined(__AVR_ATmega168__)
      loop_until_bit_is_set(UCSR0A, UDRE0); /* Wait until data register empty. */
      UDR0 = c; 
#else
      Serial.write(c);
#endif
      length--;
      if (! length) break;
    }
  }
  ada_fona.HTTP_POST_end();
  return postOK;
}
// end of fun declaration
// **************************************************************************************************