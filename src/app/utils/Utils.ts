/**
 * Created by Mtui on 10/6/16.
 */
import {DevicesModels} from "../model/DeviceModels";
import {DeviceTypes} from "../model/DeviceTypes";

export class  Utils{
  static getDeviceModel(deviceType:string): DevicesModels {
    switch(deviceType) {
      case "Apple":
        return DevicesModels.Apple;
      case "Blackberry":
        return DevicesModels.Blackberry;
    }
  }

  static getDeviceType(deviceType:string): DeviceTypes {
    switch(deviceType) {
      case "Tablet":
        return DeviceTypes.Tablet;
      case "Laptop":
        return DeviceTypes.Laptop;
      case "Phone":
        return DeviceTypes.Phone;
    }
  }
}
