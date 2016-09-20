/**
 * Created by Mtui on 9/19/16.
 */
import { DeviceTypes } from "./DeviceTypes";
import { DeviceDisplayOffset } from "./DeviceDisplayOffset";
import {DevicesModels} from "./DeviceModels";

export class Device {
    constructor(
        public deviceType: DeviceTypes,
        public deviceModel: DevicesModels,
        public condition: string,
        public resourceUrl: string,
        public iconOffset: DeviceDisplayOffset,
        public name: string,
        public names: string[]
    ){}
}
