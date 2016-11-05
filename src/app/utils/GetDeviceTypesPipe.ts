/**
 * Created by Mtui on 10/7/16.
 */
import {Pipe, PipeTransform} from "@angular/core";
import {Device} from "../model/Device";
import {DeviceTypes} from "../model/DeviceTypes";

@Pipe({
  name: "getDeviceType"
})

export class GetDeviceTypesPipe implements PipeTransform{
  transform(devices: Device[], deviceType: DeviceTypes): Device[] {

      var makes:Device[] = [];
      var test: boolean[] = [];

      devices.forEach((device) => {
        if(test[device.make] === undefined && device.deviceType === deviceType) {
          test[device.make] = true;
          device.displayName = this.getDisplayName(device.name, device.deviceType);
          makes.push(device);
        }        
      });

      return makes;
    }

    getDisplayName(name:string, deviceType): string {
      var a: string[] = name.split(" ");
      var newName: string = "";

      if(deviceType === 3)
        return name;

      for(var i:number = 0; i < a.length-1; i++) {
        newName += a[i];
        if(i !== a.length-2) {
          newName += "  ";
        }
      }

      return newName;
    }
}
