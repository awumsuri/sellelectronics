/**
 * Created by Mtui on 9/21/16.
 */
import {Pipe, PipeTransform} from "@angular/core";
import {Device} from "../model/Device";
import {DeviceTypes} from "../model/DeviceTypes";

@Pipe({
    name: "hasDeviceType"
})

export class HasDeviceType implements PipeTransform {
    transform(devices: Device[], deviceType: DeviceTypes): boolean{
        for(var i = 0; i < devices.length; i++) {
            var d: Device = devices[i];
            if (d.deviceType === deviceType) {
                return true;
            }
        }
        return false;
    }
}
