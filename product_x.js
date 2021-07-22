const ALERT_SERVICE = "00000000-1212-efde-1523-780f0000000d"
const VOLTAGE_YELLOW_CHAR = "00000007-1212-efde-1523-780f0000000d"
const VOLTAGE_RED_CHAR = "00000008-1212-efde-1523-780f0000000d"
const CURRENT_YELLOW_CHAR = "00000003-1212-efde-1523-780f0000000d"
const CURRENT_RED_CHAR = "00000004-1212-efde-1523-780f0000000d"
const VOLTAGE_READING_CHAR = "00000005-1212-efde-1523-780f0000000d"
const  CURRENT_READING_CHAR = "00000001-1212-efde-1523-780f0000000d"
class ProductX {

  constructor(disconnect_cb) {
    this.device = null;
    this.disconnect_cb = disconnect_cb;
    this.onDisconnected = this.onDisconnected.bind(this);
  }
  
  request() {
    let options = {
      "filters": [{
        "namePrefix": "Sixth"
      }],
      "optionalServices": [ALERT_SERVICE]
    };
    return navigator.bluetooth.requestDevice(options)
    .then(device => {
      this.device = device;
      this.device.addEventListener('gattserverdisconnected', this.onDisconnected);
    });
  }
  
  connect() {
    if (!this.device) {
      return Promise.reject('Device is not connected.');
    }
    return this.device.gatt.connect();
}
  
  readVoltageYellow() {
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(VOLTAGE_YELLOW_CHAR))
    .then(characteristic => characteristic.readValue())
    .then(value => {
        let view = new Uint32Array(value.buffer);
        return view[0];
    })
  }

  writeVoltageYellow(value) {
    let data = new Uint32Array(1);
    data[0] = value;
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(VOLTAGE_YELLOW_CHAR))
    .then(characteristic => characteristic.writeValue(data));
  }
  readVoltageRed() {
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(VOLTAGE_RED_CHAR))
    .then(characteristic => characteristic.readValue())
    .then(value => {
        console.log(value);
        let view = new Uint32Array(value.buffer);
        console.log(view[0]);
        return view[0];
    })
  }

  writeVoltageRed(value) {
    let data = new Uint32Array(1);
    data[0] = value;
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(VOLTAGE_RED_CHAR))
    .then(characteristic => characteristic.writeValue(data));
  }

   readCurrentYellow() {
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(CURRENT_YELLOW_CHAR))
    .then(characteristic => characteristic.readValue())
    .then(value => {
        let view = new Uint32Array(value.buffer);
        return view[0];
    })
  }

  writeCurrentYellow(value) {
    let data = new Uint32Array(1);
    data[0] = value;
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(CURRENT_YELLOW_CHAR))
    .then(characteristic => characteristic.writeValue(data))
    
  }
  readCurrentRed() {
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(CURRENT_RED_CHAR))
    .then(characteristic => characteristic.readValue())
    .then(value => {
        let view = new Uint32Array(value.buffer);
        return view[0];
    })
  }

  writeCurrentRed(value) {
    let data = new Uint32Array(1);
    data[0] = value;
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(CURRENT_RED_CHAR))
    .then(characteristic => characteristic.writeValue(data));
  }

  readCurrentField() {
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(CURRENT_READING_CHAR))
    .then(characteristic => characteristic.readValue())
    .then(value => {
        let view = new Uint32Array(value.buffer);
        return view[0];
    })
  }
  readVoltageField() {
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(VOLTAGE_READING_CHAR))
    .then(characteristic => characteristic.readValue())
    .then(value => {
        let view = new Uint32Array(value.buffer);
        return view[0];
    })
  }

  disconnect() {
    if (!this.device) {
      return Promise.reject('Device is not connected.');
    }
    return this.device.gatt.disconnect();
  }

  onDisconnected() {
    console.log('Device is disconnected.');
    if(this.disconnect_cb)
    {
        this.disconnect_cb();
    }
  }
}

