/**
 * Created by Mtui on 10/8/16.
 */
import {Pipe, PipeTransform} from "@angular/core";
import {Device} from "../model/Device";

@Pipe({
  name: "getDevicesByMake"
})

export class GetDeviceByMakePipe implements PipeTransform{
  transform(devices: Device[], make:string): Device[] {
    var makes: Device[] = [];

    devices.forEach((device) => {
      if(device.make === make){
        makes.push(device);
      }
    });

    return makes;
  }
}
