/**
 * Created by Mtui on 9/19/16.
 */
import { DeviceTypes } from "./DeviceTypes";
import { DeviceDisplayOffset } from "./DeviceDisplayOffset";
import {DevicesModels} from "./DeviceModels";
import {ConditionType} from "./ConditionType";

export class Device {
    constructor(
        public deviceType,
        public deviceModel: DevicesModels,
        public condition: ConditionType,
        public resourceUrl: string,
        public iconOffset: DeviceDisplayOffset,
        public name: string,
        public names: {display: "", gazelle: ""}[],
        public make: string,
        public deviceMap: any,
        public displayName: string,
        public carrier: string,
        public isDummy

    ){}

    hasDeviceType(deviceType: DeviceTypes) {
        return (deviceType === this.deviceType)
    }
}
