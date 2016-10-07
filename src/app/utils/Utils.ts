/**
 * Created by Mtui on 10/6/16.
 */
import {DevicesModels} from "../model/DeviceModels";

export class  Utils{
  static getDeviceModel(deviceType:string): DevicesModels {
    switch(deviceType) {
      case "Apple":
        return DevicesModels.Apple;
      case "Blackberry":
        return DevicesModels.Blackberry;
    }
  }
}
