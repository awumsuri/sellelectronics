/**
 * Created by Mtui on 10/6/16.
 */
import {DevicesModels} from "../model/DeviceModels";
import {DeviceTypes} from "../model/DeviceTypes";

export class  Utils {
  static getDeviceModel(deviceType:string): DevicesModels {
    switch(deviceType) {
      case "Apple":
        return DevicesModels.Apple;
      case "Blackberry":
        return DevicesModels.Blackberry;
      case "HTC":
        return DevicesModels.HTC;
      case "Samsung":
        return DevicesModels.Samsung;
      case "Motorola":
        return DevicesModels.Motorola;
      case "Nokia":
        return DevicesModels.Nokia
      case "LG":
        return DevicesModels.LG
      case "ASUS":
        return DevicesModels.ASUS
      default:
        return null;
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
      default:
        return null;
    }
  }

  static toUpperCaseFirstLetter(s:string): string {

    return s.toLowerCase().replace(/\b[a-z]/g, (letter) => {
      return letter.toUpperCase();
    });
  }
}
