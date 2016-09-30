/**
 * Created by Mtui on 9/29/16.
 */
import {Pipe, PipeTransform} from "@angular/core";
import {UserDevice} from "../model/UserDevice";
import {GazelleDAO} from "../model/GazelleDAO";

@Pipe({
    name: "getPrice"
})

export class FindPricePipe implements PipeTransform{
    transform(devicesDataList: GazelleDAO[], userDevice: UserDevice): any {
        for(var i = 0; i < devicesDataList.length; i++) {
            var device: GazelleDAO = devicesDataList[i];
            if(device.carrier === userDevice.carrier
                && device.make === userDevice.make
                && device.size === userDevice.size) {
                return device;
            }
        }

        return 0;
    }
}

