import {Pipe, PipeTransform} from "@angular/core"
import {Device} from "../model/Device";
import {DevicesModels} from "../model/DeviceModels";

@Pipe({
  name: "hasDeviceModel"
})

export class GetDeviceModelPipe implements PipeTransform {
  transform(devices: Device[], name: DevicesModels): boolean {
    for(let index:number = 0; index < devices.length; index++) {
      let device:Device = devices[index];
      if(device.deviceModel === name) {
        return true;
      }
    }
    
    return false;
  }
}
