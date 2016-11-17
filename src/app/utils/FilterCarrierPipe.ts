/**
 * Created by Mtui on 10/8/16.
 */

import {Pipe, PipeTransform} from "@angular/core";
import {GazelleDAO} from "../model/GazelleDAO";


@Pipe({
  name: "filterCarrierType"
})

export class FilterCarrierPipe implements PipeTransform{
  transform(devices: GazelleDAO[], carrier: string): boolean {
      for(var i:number = 0; i < devices.length; i++) {
        var device: GazelleDAO = devices[i];
        if(device.carrier === carrier)
          return true;
      }

    return false;
  }
}
