const ALERT_SERVICE = "00000000-1212-efde-1523-780f0000000d"
const CURRENT_READING_CHAR = "00000001-1212-efde-1523-780f0000000d"
const CURRENT_REALERT_CHAR = "00000002-1212-efde-1523-780f0000000d"
const CURRENT_YELLOW_CHAR = "00000003-1212-efde-1523-780f0000000d" 
const CURRENT_RED_CHAR = "00000004-1212-efde-1523-780f0000000d"
const VOLTAGE_READING_CHAR = "00000005-1212-efde-1523-780f0000000d"
const VOLTAGE_REALERT_CHAR = "00000006-1212-efde-1523-780f0000000d" 
const VOLTAGE_YELLOW_CHAR = "00000007-1212-efde-1523-780f0000000d"
const VOLTAGE_RED_CHAR = "00000008-1212-efde-1523-780f0000000d"

const VOLTAGE_MODE_RANGE = "00000010-1212-efde-1523-780f0000000d"
const CURRENT_LOW_THRESHOLDS = "00000011-1212-efde-1523-780f0000000d"
const CURRENT_HIGH_THRESHOLDS = "00000012-1212-efde-1523-780f0000000d"
const SENSITIVITY_LEVEL = "00000013-1212-efde-1523-780f0000000d"
const VOLTAGE_LOW_THRESHOLDS = "00000014-1212-efde-1523-780f0000000d"
const VOLTAGE_HIGH_THRESHOLDS = "00000015-1212-efde-1523-780f0000000d"

const SMART_ADAPTIVE_VOLTAGE = "00000016-1212-efde-1523-780f0000000d"
const SMART_ADAPTIVE_CURRENT = "00000017-1212-efde-1523-780f0000000d"

const LOGGING_CONFIG = "00000018-1212-efde-1523-780f0000000d"
const SERIAL_NUMBER = "0000001a-1212-efde-1523-780f0000000d"

const ALGORITHM_CONFIG = "00000009-1212-efde-1523-780f0000000d"
const CREW_CHANNEL = "0000000a-1212-efde-1523-780f0000000d"
const CREW_MODE_FORCED_ENABLED = "0000000b-1212-efde-1523-780f0000000d"

const LOW_FILTER_THRESHOLD = "0000000c-1212-efde-1523-780f0000000d"
const LOW_FILTER_ALPHA = "0000000d-1212-efde-1523-780f0000000d"
const DELTA_FILTER_THRESHOLD = "0000000e-1212-efde-1523-780f0000000d"
const DELTA_FILTER_ALPHA = "0000000f-1212-efde-1523-780f0000000d"

const UI_SERVICE = "00000000-1212-efde-1523-780d000000f0"
const UI_BRIGHTNESS_CHAR = "00000001-1212-efde-1523-780d000000f0"
const UI_COLOR_CHAR = "00000002-1212-efde-1523-780d000000f0"
const UI_SOUND_CHAR = "00000003-1212-efde-1523-780d000000f0"

const NRF_NUS_SERVICE = "6e400001-b5a3-f393-e0a9-e50e24dcca9e"

const NRF_NUS_RX = "6e400002-b5a3-f393-e0a9-e50e24dcca9e"
const NRF_NUS_TX = "6e400003-b5a3-f393-e0a9-e50e24dcca9e"


const DEVICE_INFORMATION_SERVICE = "0000180a-0000-1000-8000-00805f9b34fb"
const FW_VERSION = "00002a26-0000-1000-8000-00805f9b34fb"
class ProductX {

  constructor(disconnect_cb) {
    this.device = null;
    this.disconnect_cb = disconnect_cb;
    this.onDisconnected = this.onDisconnected.bind(this);
  }
  
  request() {
    let options = {
      "filters": [{ 
        "name": "SixthSense"
      },{ 
        "name": "6S"
      }],
      "optionalServices": [ALERT_SERVICE, DEVICE_INFORMATION_SERVICE, UI_SERVICE, NRF_NUS_SERVICE]
    };
    return navigator.bluetooth.requestDevice(options)
    .then(device => {
      this.device = device;
      this.device.addEventListener('gattserverdisconnected', this.onDisconnected);
    })
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
  readVoltageRealert() {
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(VOLTAGE_REALERT_CHAR))
    .then(characteristic => characteristic.readValue())
    .then(value => {
        console.log(value);
        let view = new Uint32Array(value.buffer);
        console.log(view[0]);
        return view[0];
    })
  }

  writeVoltageRealert(value) {
    let data = new Uint32Array(1);
    data[0] = value;
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(VOLTAGE_REALERT_CHAR))
    .then(characteristic => characteristic.writeValue(data))
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

  readCurrentRealert() {
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(CURRENT_REALERT_CHAR))
    .then(characteristic => characteristic.readValue())
    .then(value => {
        let view = new Uint32Array(value.buffer);
        return view[0];
    })
  }

  writeCurrentRealert(value) {
    let data = new Uint32Array(1);
    data[0] = value;
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(CURRENT_REALERT_CHAR))
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

  readBrightness()
  {
    return this.device.gatt.getPrimaryService(UI_SERVICE)
    .then(service => service.getCharacteristic(UI_BRIGHTNESS_CHAR))
    .then(characteristic => characteristic.readValue())
    .then(value => {
        let view = new Uint8Array(value.buffer);
        return view[0];
    })
  }
  writeBrightness(value)
  {
    if(value > 255) value = 255;
    let data = new Uint8Array(1);
    data[0] = value;
    return this.device.gatt.getPrimaryService(UI_SERVICE)
    .then(service => service.getCharacteristic(UI_BRIGHTNESS_CHAR))
    .then(characteristic => characteristic.writeValue(data));
  }
  async writeSound(values)
  {
    // let values = [{frequency:3000, duration:100}, {frequency:2000, duration:200}];
    let count_of_writes = parseInt(values.length/25);
    if(values.length%25 != 0) count_of_writes++;
    let arr_of_buffers = []
    let remaining_length = values.length;
    let sound_idx = 0;
    while(remaining_length > 0)
    {
        let this_length = 25;
        if(remaining_length < 25) this_length = remaining_length;
        let buffer = new ArrayBuffer(3*this_length+1);
        let data = new Uint8Array(buffer);
        let buffer_idx=0;
        data[buffer_idx] = sound_idx;
        buffer_idx++;
        for(let i=0; i<this_length; i++)
        {
            let raw = (values[i+sound_idx].frequency & 0x1FFF) | ((values[i+sound_idx].duration & 0xFFF) << 13);
            console.log("raw is "+raw)
            data[buffer_idx] = raw&0x0000FF;
            console.log(data[buffer_idx]);
            buffer_idx++;
            data[buffer_idx] = (raw&0x00FF00)>>8;
            console.log(data[buffer_idx]);
            buffer_idx++;
            data[buffer_idx] = (raw&0xFF0000)>>16;
            console.log(data[buffer_idx]);
            buffer_idx++;
            // data[idx] = values[values_idx].frequency;
            // idx++;
            // data[idx] = values[values_idx].duration;
            // idx++;
        }
        sound_idx = sound_idx + this_length;
        remaining_length = remaining_length - this_length;
        arr_of_buffers.push(buffer);
    }
    for(let idx in arr_of_buffers)
    {
        await this.device.gatt.getPrimaryService(UI_SERVICE)
        .then(service => service.getCharacteristic(UI_SOUND_CHAR))
        .then(characteristic =>characteristic.writeValue(arr_of_buffers[idx]))
    }
    return true;

  }
  writeLEDColors(values)
  {
    let buffer = new ArrayBuffer(12)
    let data = new Uint8Array(buffer)
    let idx = 0;
    for(var color_idx in values)
    {
        let color = values[color_idx]
        console.log(color);
        data[idx] = color["red"];
        idx++;
        data[idx] = color["green"];
        idx++;
        data[idx] = color["blue"];
        idx++;
    }
    return this.device.gatt.getPrimaryService(UI_SERVICE)
    .then(service=> service.getCharacteristic(UI_COLOR_CHAR))
    .then(characteristic =>characteristic.writeValue(buffer))
  }
  // readAlgorithmConfigNew() {
  //   return this.device.gatt.getPrimaryService(ALERT_SERVICE)
  //   .then(service=> service.getCharacteristics())
  //   .then(all_characteristics => {
  //       for(let idx in all_characteristics)
  //       {
  //           let ch = all_characteristics[idx];
  //           if(ch.uuid == ALGORITHM_CONFIG)
  //           {
  //               return ch.readValue();
  //           }
  //       }
  //       return {"buffer":[0]}
  //   })
  //   // .then(service => service.getCharacteristic(ALGORITHM_CONFIG))
  //   // .then(characteristic => characteristic.readValue())
  //   // .error(error => {
  //   //     return 0;
  //   // })
  //   .then(value => {
  //       let view = new Uint8Array(value.buffer);
  //       return view[0];
  //   })
  // }
  readAlgorithmConfig() {
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service=> service.getCharacteristics())
    .then(all_characteristics => {
        for(let idx in all_characteristics)
        {
            let ch = all_characteristics[idx];
            if(ch.uuid == ALGORITHM_CONFIG)
            {
                return ch.readValue();
            }
        }
        return {"buffer":[0]}
    })
    // .then(service => service.getCharacteristic(ALGORITHM_CONFIG))
    // .then(characteristic => characteristic.readValue())
    // .error(error => {
    //     return 0;
    // })
    .then(value => {
        let view = new Uint32Array(value.buffer);
        return view[0];
    })
  }


  writeAlgorithmConfig(value) {
    let data = new Uint32Array(1);
    data[0] = value;
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(ALGORITHM_CONFIG))
    .then(characteristic => characteristic.writeValue(data));
  }

  readCrewChannel() {
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service=> service.getCharacteristics())
    .then(all_characteristics => {
        for(let idx in all_characteristics)
        {
            let ch = all_characteristics[idx];
            if(ch.uuid == CREW_CHANNEL)
            {
                return ch.readValue();
            }
        }
        return {"buffer":[0]}
    })
    .then(value => {
        let view = new Uint32Array(value.buffer);
        console.log("crew channel is",view[0])
        return view[0];
    })
  }
  writeCrewChannel(value) {
    let data = new Uint32Array(1);
    data[0] = value;
    console.log("writeCrewChannel",value);
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(CREW_CHANNEL))
    .then(characteristic => characteristic.writeValue(data));
  }

  readCrewModeForcedEnabled() {
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service=> service.getCharacteristics())
    .then(all_characteristics => {
        for(let idx in all_characteristics)
        {
            let ch = all_characteristics[idx];
            if(ch.uuid == CREW_MODE_FORCED_ENABLED)
            {
                return ch.readValue();
            }
        }
        return {"buffer":[0]}
    })
    .then(value => {
        let view = new Uint32Array(value.buffer);
        return view[0];
    })
  }
  writeCrewModeForcedEnabled(value) {
    let data = new Uint32Array(1);
    data[0] = value;
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(CREW_MODE_FORCED_ENABLED))
    .then(characteristic => characteristic.writeValue(data));
  }

  readFirmwareVersion(){
    return this.device.gatt.getPrimaryService(DEVICE_INFORMATION_SERVICE)
    .then(service => service.getCharacteristic(FW_VERSION))
    .then(characteristic => characteristic.readValue())
    .then(value => {
        console.log(value)
        let enc = new TextDecoder("utf-8");
        let arr = new Uint8Array(value.buffer);
        let version = enc.decode(arr);
        console.log(version)
        return version;
    })
  }
  readLowFilterThreshold() {
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service=> service.getCharacteristics())
    .then(all_characteristics => {
        for(let idx in all_characteristics)
        {
            let ch = all_characteristics[idx];
            if(ch.uuid == LOW_FILTER_THRESHOLD)
            {
                return ch.readValue();
            }
        }
        return {"buffer":[0]}
    })
    .then(value => {
        let view = new Uint32Array(value.buffer);
        return view[0];
    })
  }
  writeLowFilterThreshold(value) {
    let data = new Uint32Array(1);
    data[0] = value;
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(LOW_FILTER_THRESHOLD))
    .then(characteristic => characteristic.writeValue(data));
  }
  readLowFilterAlpha() {
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service=> service.getCharacteristics())
    .then(all_characteristics => {
        for(let idx in all_characteristics)
        {
            let ch = all_characteristics[idx];
            if(ch.uuid == LOW_FILTER_ALPHA)
            {
                return ch.readValue();
            }
        }
        return {"buffer":[0]}
    })
    .then(value => {
        let view = new Uint32Array(value.buffer);
        console.log("readLowFilterAlpha ",view[0]);
        return view[0]/1000.0;
    })
  }
  writeLowFilterAlpha(value) {
    let data = new Uint32Array(1);
    data[0] = (value*1000);
    console.log("writeLowFilterAlpha ",value," ",data[0]);
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(LOW_FILTER_ALPHA))
    .then(characteristic => characteristic.writeValue(data));
  }
  readDeltaFilterAlpha() {
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service=> service.getCharacteristics())
    .then(all_characteristics => {
        for(let idx in all_characteristics)
        {
            let ch = all_characteristics[idx];
            if(ch.uuid == DELTA_FILTER_ALPHA)
            {
                return ch.readValue();
            }
        }
        return {"buffer":[0]}
    })
    .then(value => {
        let view = new Uint32Array(value.buffer);
        console.log("readDeltaFilterAlpha ",view[0]);
        return view[0]/1000.0;
    })
  }
  writeDeltaFilterAlpha(value) {
    let data = new Uint32Array(1);
    data[0] = (value*1000);
    console.log("writeDeltaFilterAlpha ",value," ",data[0]);
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(DELTA_FILTER_ALPHA))
    .then(characteristic => characteristic.writeValue(data));
  } 
  readDeltaFilterThreshold() {
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service=> service.getCharacteristics())
    .then(all_characteristics => {
        for(let idx in all_characteristics)
        {
            let ch = all_characteristics[idx];
            if(ch.uuid == DELTA_FILTER_THRESHOLD)
            {
                return ch.readValue();
            }
        }
        return {"buffer":[0]}
    })
    .then(value => {
        let view = new Uint32Array(value.buffer);
        return view[0];
    })
  }
  writeDeltaFilterThreshold(value) {
    let data = new Uint32Array(1);
    data[0] = value;
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(DELTA_FILTER_THRESHOLD))
    .then(characteristic => characteristic.writeValue(data));
  }
  readCurrentThresholds(is_high)
  {
    let uuid = CURRENT_LOW_THRESHOLDS;
    if(is_high)
    {
        uuid = CURRENT_HIGH_THRESHOLDS;
    }
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service=> service.getCharacteristics())
    .then(all_characteristics => {
        for(let idx in all_characteristics)
        {
            let ch = all_characteristics[idx];
            if(ch.uuid == uuid)
            {
                return ch.readValue();
            }
        }
        return {"buffer":[0]}
    })
    .then(value => {
        let view = new Uint32Array(value.buffer);
        console.log("Data length is "+view.length);
        return {"yellow":[view[0], view[1], view[2], view[3]], "red":[view[4], view[5], view[6], view[7]]}
    })
  }
  writeCurrentThresholds(is_high, values)
  {
    let buffer = new ArrayBuffer(32)
    let data = new Uint32Array(buffer)
    let data_idx = 0;
    for(var value_idx in values["yellow"])
    {
        let value = values["yellow"][value_idx];
        data[data_idx] = value;
        data_idx++;
    }
    data_idx = 4;
    for(var value_idx in values["red"])
    {
        let value = values["red"][value_idx];
        data[data_idx] = value;
        data_idx++;
    }
    let uuid = CURRENT_LOW_THRESHOLDS;
    if(is_high)
    {
        uuid = CURRENT_HIGH_THRESHOLDS;
    }
    console.log(buffer);
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
        .then(service => service.getCharacteristic(uuid))
        .then(characteristic => characteristic.writeValue(buffer))

  }
  readVoltageThresholds(is_high)
  {
    let uuid = VOLTAGE_LOW_THRESHOLDS;
    if(is_high)
    {
        uuid = VOLTAGE_HIGH_THRESHOLDS;
    }
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service=> service.getCharacteristics())
    .then(all_characteristics => {
        for(let idx in all_characteristics)
        {
            let ch = all_characteristics[idx];
            if(ch.uuid == uuid)
            {
                return ch.readValue();
            }
        }
        return {"buffer":[0]}
    })
    .then(value => {
        let view = new Uint16Array(value.buffer);
        console.log("Data length is "+view.length);
        return {"yellow":[view[0], view[1], view[2], view[3]], "red":[view[4], view[5], view[6], view[7]]}
    })
  }
  writeVoltageThresholds(is_high, values)
  {
    let buffer = new ArrayBuffer(16)
    let data = new Uint16Array(buffer)
    let data_idx = 0;
    for(var value_idx in values["yellow"])
    {
        let value = values["yellow"][value_idx];
        data[data_idx] = value;
        data_idx++;
    }
    data_idx = 4;
    for(var value_idx in values["red"])
    {
        let value = values["red"][value_idx];
        data[data_idx] = value;
        data_idx++;
    }
    let uuid = VOLTAGE_LOW_THRESHOLDS;
    if(is_high)
    {
        uuid = VOLTAGE_HIGH_THRESHOLDS;
    }
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
        .then(service => service.getCharacteristic(uuid))
        .then(characteristic => characteristic.writeValue(buffer))

  }
  readVoltageRange(){
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(VOLTAGE_MODE_RANGE))
    .then(characteristic => characteristic.readValue())
    .then(value => {
        let view = new Uint8Array(value.buffer);
        return view[0];
    })
  }
  writeVoltageRange(value){
    let data = new Uint8Array(1);
    data[0] = value;
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(VOLTAGE_MODE_RANGE))
    .then(characteristic => characteristic.writeValue(data));
  }
  readSensitivityLevel(){
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(SENSITIVITY_LEVEL))
    .then(characteristic => characteristic.readValue())
    .then(value => {
        let view = new Uint8Array(value.buffer);
        return {"voltage":view[0], "current":view[1]}
    })
  }
  readSerialNumber(){
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service=> service.getCharacteristics())
    .then(all_characteristics => {
        for(let idx in all_characteristics)
        {
            let ch = all_characteristics[idx];
            if(ch.uuid == SERIAL_NUMBER)
            {
                return ch.readValue()
                .then(value => {
                    let view = new Uint32Array(value.buffer);
                    return view[1];
                });
            }
        }
        return 0
    })
  }
  writeSerialNumber(number)
  {
    let data = new Uint32Array(2);
    // data[0] = 0xAABBCCDD;
    data[0] = 0xDDCCBBAA;
    data[1] = number;
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(SERIAL_NUMBER))
    .then(characteristic => characteristic.writeValue(data));
  }
  writeSensitivityLevel(sensitivity){
    let data = new Uint8Array(2);
    data[0] = sensitivity["voltage"];
    data[1] = sensitivity["current"];
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(SENSITIVITY_LEVEL))
    .then(characteristic => characteristic.writeValue(data));
  }
  writeSmartAdaptiveConfig(is_voltage, config)
  {
    let characteristic_uuid = is_voltage ? SMART_ADAPTIVE_VOLTAGE : SMART_ADAPTIVE_CURRENT;
    let buffer = new ArrayBuffer(28);
    let view = new DataView(buffer);
    view.setUint32(0,1000.0*config["slow_alpha"],true)
    view.setUint32(4,1000.0*config["fast_alpha"],true)
    view.setUint32(8,config["entering_threshold"],true)
    view.setUint32(12,config["exiting_threshold"],true)
    view.setUint32(16,config["entering_time_delay"],true)
    view.setUint32(20,config["exiting_time_delay"],true)
    view.setUint32(24,config["enabled"] ? 1 : 0,true)
    let view8 = new Uint8Array(buffer);
    for(let i=0; i<view8.length; i++)
    {
        console.log("d["+i+"]="+view8[i].toString(16));
    }
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(characteristic_uuid))
    .then(characteristic => characteristic.writeValue(view8));
  }
  readSmartAdaptiveConfig(is_voltage)
  {
    let characteristic_uuid = is_voltage ? SMART_ADAPTIVE_VOLTAGE : SMART_ADAPTIVE_CURRENT;
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
    .then(service => service.getCharacteristic(characteristic_uuid))
    .then(characteristic => characteristic.readValue())
    .then(value => {
        let view32 = new Uint32Array(value.buffer);
        let viewFloat = new Float32Array(value.buffer);
        let to_ret = {
            "slow_alpha":view32[0]/1000.0,
            "fast_alpha":view32[1]/1000.0,
            "entering_threshold":view32[2],
            "exiting_threshold":view32[3],
            "entering_time_delay":view32[4],
            "exiting_time_delay":view32[5],
            "enabled":(view32[6] & 0b1) ? true : false
        }
        let view8 = new Uint8Array(value.buffer)
        for(let i=0; i<view8.length; i++)
        {
            console.log("d["+i+"]="+view8[i].toString(16));
        }
        console.log(to_ret);
        return to_ret;
    })
  }
//   function copy(src)  {
//     var dst = new ArrayBuffer(src.byteLength);
//     new Uint8Array(dst).set(new Uint8Array(src));
//     return dst;
// }
logging_notification_handler(event)
  {
    let value = event.target.value;
    console.log("Adding "+value.byteLength);
    if(!this.logging_data)
    {
        let new_data = new ArrayBuffer(12)
        let now = Date.now()
        //javacript doesn't do bit shifting for 64 bit numbers.
        let lower = (now%Math.pow(2,32))
        let upper = (now - lower)/Math.pow(2,32)
        
        new Uint32Array(new_data).set(new Uint32Array([0x01, lower, upper]),0)
        this.logging_data = new_data;
    }
    if(this.logging_data)
    {
        let new_data = new ArrayBuffer(this.logging_data.byteLength + event.target.value.byteLength)
        new Uint8Array(new_data).set(new Uint8Array(this.logging_data),0)
        new Uint8Array(new_data).set(new Uint8Array(event.target.value.buffer),this.logging_data.byteLength);
        this.logging_data = new_data
        console.log(this.logging_data);
    }
  }
  startLogging(logging_type)
  {
    let val = 0;
    if(logging_type["voltage"]) val = val | 0b001;
    if(logging_type["current"]) val = val | 0b010;
    let uint8 = new Uint8Array([val])
    return this.device.gatt.getPrimaryService(ALERT_SERVICE)
        .then(service => service.getCharacteristic(LOGGING_CONFIG))
        .then(characteristic => characteristic.writeValue(uint8))
        .then(val => this.device.gatt.getPrimaryService(NRF_NUS_SERVICE))
        .then(service => service.getCharacteristic(NRF_NUS_TX))
        .then(characteristic => {
            let rxCharacteristic = characteristic;
            return rxCharacteristic.startNotifications()
            .then(_ =>{
                rxCharacteristic.addEventListener("characteristicvaluechanged",this.logging_notification_handler)
            })
        })   
  }
  stopLogging()
  {
    return this.device.gatt.getPrimaryService(NRF_NUS_SERVICE)
    .then(service => service.getCharacteristic(NRF_NUS_TX))
    .then(characteristic => {
        characteristic.stopNotifications()
        characteristic.removeEventListener("characteristicvaluechanged",this.logging_notification_handler)
        this.logged_data = characteristic.logging_data;
        characteristic.logging_data = false;
    })

  }
  loggedData()
  {
    return this.logged_data;
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

