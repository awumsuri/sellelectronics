/**
 * Created by Mtui on 9/19/16.
 */
import { Http } from "@angular/http";
import {Injectable} from "@angular/core";
import {DeviceTypes} from "../model/DeviceTypes";
import {DevicesModels} from "../model/DeviceModels";
import {Device} from "../model/Device";
import {GazelleDAO} from "../model/GazelleDAO";

@Injectable()
export class DeviceService {

    private deviceData: Device[] = [];
    private gazellData: GazelleDAO[];

    constructor(private http: Http) {
        this.loadDevices();
        this.loadGazelleData();
    }

    public getDevices(): Device[] {
        return this.deviceData;
    }

    public getGazelleData(): GazelleDAO[] {
        return this.gazellData;
    }

    private loadGazelleData() {
        this.http.get("/resource/gazelleData.json")
            .subscribe(
                data => {
                    this.gazellData = data.json();
                },
                err => {
                    console.error(err);
                },
                () => console.debug("done")
            )
    }

    private loadDevices() {
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
    private getModel(d) {
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

    private getType(d) {
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

    private populateDeviceData(data: Device[]) {
        data.forEach(d => {
            d.names.forEach(name => {
                var imageName: string = name.display;
                while(imageName.indexOf(" ") !== -1){
                    imageName = imageName.replace(" ", "");
                }
                this.deviceData.push(
                    new Device(
                        this.getType(d),
                        this.getModel(d),
                        null,
                        (d.resourceUrl + "/"+ imageName +".png"),
                        null,
                        name["display"],
                        null,
                        name["gazelle"],
                        d.deviceMap,
                        null
                    )
                )
            }
        )

        })
    }
}
