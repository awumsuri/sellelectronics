/**
 * Created by Mtui on 10/8/16.
 */
import {Pipe, PipeTransform} from "@angular/core";
import {Device} from "../model/Device";
import {GazelleDAO} from "../model/GazelleDAO";

@Pipe({
  name: "getDevicesByMake"
})

export class GetDeviceByMakePipe implements PipeTransform{
  transform(devices: any[], make:string): any[] {
    var makes: any[] = [];

    
    devices.forEach((device) => {
      if(device.make === make){
        makes.push(device);
      }
    });

    return makes;
  }
}
