/**
 * Created by Mtui on 11/6/16.
 */
import {Pipe, PipeTransform} from "@angular/core"
import {Device} from "../model/Device";
import {DevicesModels} from "../model/DeviceModels";

@Pipe({
  name: "getLikeDevice"
})

export class GetDevicesLikeMakePipe implements PipeTransform {
  transform(devices: Device[], like: string): Device[] {
    let makes = [];

    devices.forEach(function(device) {
      if(device.make.indexOf(like) !== -1) {
        makes.push(device);
      }
    });

    return makes;
  }
}



