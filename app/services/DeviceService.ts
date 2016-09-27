/**
 * Created by Mtui on 9/19/16.
 */
import { Http } from "@angular/http";
import {Injectable} from "@angular/core";
import {DeviceTypes} from "../model/DeviceTypes";
import {DevicesModels} from "../model/DeviceModels";
import {Device} from "../model/Device";

@Injectable()
export class DeviceService {

    private deviceData: Device[] = [];

    constructor(private http: Http) {
        this.loadDevices();
    }

    getDevices() {
        return this.deviceData;
    }

    loadDevices() {
        this.http.get("/resource/resource.json")
            .subscribe(
                data => {
                    this.populateDeviceData(data.json());
                },
                err => {
                    console.log(err)
                },
                () => console.log("done")
            )
    }
    getModel(d) {
        var model;

        switch(d.deviceModel) {
            case DevicesModels[DevicesModels.Apple]:
                model = DevicesModels.Apple;
                break;
            case DevicesModels[DevicesModels.Samsung]:
                model = DevicesModels.Samsung;
                break;
        }

        return model;
    }

    getType(d) {
        var type;

        switch(d.deviceType) {
            case DeviceTypes[DeviceTypes.Phone]:
                type = DeviceTypes.Phone;
                break;
            case DeviceTypes[DeviceTypes.Tablet]:
                type = DeviceTypes.Tablet;
                break;
            case DeviceTypes[DeviceTypes.Laptop]:
                type = DeviceTypes.Laptop;
                break;
        }

        return type;
    }

    populateDeviceData(data: Device[]) {
        data.forEach(d => {
            d.names.forEach(name => {
                var imageName:string = name;
                while(imageName.indexOf(" ") !== -1){
                    imageName = imageName.replace(" ", "");
                }
                this.deviceData.push(
                    new Device(
                        this.getType(d),
                        this.getModel(d),
                        null,
                        (d.resourceUrl + "/"+ imageName +".jpg"),
                        null,
                        name,
                        null
                    )
                )
            }
        )

        })
    }
}