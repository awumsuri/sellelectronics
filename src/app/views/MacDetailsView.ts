/**
 * Created by Mtui on 11/6/16.
 */
import {Component} from "@angular/core";
import {UserDevice} from "../model/UserDevice";
import {GetDeviceByMakePipe} from "../utils/GetDeviceByMakePipe";
import {DeviceService} from "../services/DeviceService";
import {GazelleDAO} from "../model/GazelleDAO";
import {Utils} from "../utils/Utils";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap"

declare var $:any;

@Component({
  selector: "mac-detailed-view",
  template: `
                <div class="logo-main">
                  <img src="{{userDevice.resourceUrl}}" />
                  <span id="mac-details">{{userDevice.displayName}}</span>
                </div>
                <div id="screen-size" class="row center">
                    <div ngbDropdown class="d-inline-block">
                      <button class="btn btn-primary" id="dropdownMenu1" ngbDropdownToggle>Screen Size</button>
                      <div   class="dropdown-menu dropdown-selector" aria-labelledby="dropdownMenu1">
                        <button *ngFor="let screen of macScreenSizes;" class="dropdown-item" (click)="screenHandler($event);">{{screen}}</button>
                      </div>
                    </div>
                </div>
                <div id="year" class="row center hide">
                    <div ngbDropdown class="d-inline-block">
                      <button class="btn btn-primary" id="dropdownMenu1" ngbDropdownToggle>Select Year</button>
                      <div   class="dropdown-menu dropdown-selector" aria-labelledby="dropdownMenu1">
                        <button *ngFor="let year of macYear | sort" class="dropdown-item" (click)="yearHandler($event); " >{{year}}</button>
                      </div>
                    </div>
                </div>
                <div id="processor" class="row center hide">
                    <div ngbDropdown class="d-inline-block">
                      <button class="btn btn-primary" id="dropdownMenu1" ngbDropdownToggle>Select Processor</button>
                      <div   class="dropdown-menu dropdown-selector" aria-labelledby="dropdownMenu1">
                        <button *ngFor="let processor of macProcessor | sort" class="dropdown-item" (click)="processorHandler($event);">{{processor}}</button>
                      </div>
                    </div>
                </div>
                <div id="maclist" *ngFor="let mac of macData | sort" class="panel panel-success hide">
                  <div class="panel-heading">
                    <ngb-alert class="panel-title">{{mac.name}}</ngb-alert>
                    <h3 class="panel-title">$ {{mac.priceFlawless}}</h3>
                    <span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-up"></i></span>
                  </div>
                  <div class="panel-body">
                    <button type="button" class="btn btn-primary btn-xs btn-update btn-add-card">Flawless</button>
                    <button type="button" class="btn btn-danger btn-xs btn-update btn-add-card">Broken</button>
                    <span class='glyphicon glyphicon-exclamation-sign text-danger pull-right icon-style'></span>
                  </div>
                </div>


            `
})
export class MacDetailsView {

  private macData: GazelleDAO[] = [];
  private macScreenSizes: string[] = [];
  private macYear: string[] = [];
  private macProcessor: string[] = [];
  private price:string;

  private resourceUrl: string = "n/a";

  constructor(private userDevice:UserDevice,
              private  deviceService: DeviceService) {
    this.macData = new GetDeviceByMakePipe().transform(deviceService.getGazelleData(), userDevice.make);
    this.macScreenSizes = this.getScreenSize();
  }

  getScreenSize(): string[] {
    var sizes: string[] = [];
    var test: any[] = [];

    Array.prototype.forEach.call(this.macData, (device: GazelleDAO) => {
      if(test[device.size] === undefined) {
        test[device.size] = true;
        sizes.push(device.size + "\"");
      }
    });

    return sizes;
  }

  getYear(): string[] {
    var years: string[] = [];
    var test: any[] = [];

    Array.prototype.forEach.call(this.macData, (device: GazelleDAO) => {
      if(test[device.year] === undefined) {
        test[device.year] = true;
        let yearStr:string = device.year.replace("-", " ");
        yearStr = Utils.toUpperCaseFirstLetter(yearStr);
        years.push(yearStr);
      }
    });

    return years;
  }

  getProcessor(): string[] {
    var processors: string[] = [];
    var test: any[] = [];

    Array.prototype.forEach.call(this.macData, (device: GazelleDAO) => {
      if(test[device.processor] === undefined) {
        test[device.processor] = true;
        let processorStr:string = device.processor;
        processorStr = processorStr.replace("-ghz"," Ghz");
        processorStr = processorStr.replace("-",".");
        processors.push(processorStr);
      }
    });

    return processors;
  }

  screenHandler(event) {
    let screenSize:string = event.target.innerHTML;

    $("#mac-details").html(this.userDevice.displayName + " " + screenSize);
    $("#screen-size").addClass("hide");
    $("#year").removeClass("hide");


    screenSize = screenSize.replace('"','');
    this.userDevice.size = screenSize;

    this.macData = this.macData.filter(
      data => {
        return data.size === screenSize;
      }
    );

    this.macYear = this.getYear();
  }

  yearHandler(event) {
    let year:string = event.target.innerHTML;

    $("#mac-details").html(this.userDevice.displayName + " " + this.userDevice.size + "\" " + year);

    $("#year").addClass("hide");
    $("#processor").removeClass("hide");

    this.userDevice.yearDisplay = year;
    year = year.toLocaleLowerCase().replace(" ", "-");

    this.macData = this.macData.filter(
      data => {
        return data.year === year;
      }
    );

    this.userDevice.year = year;
    this.macProcessor = this.getProcessor();
  }

  processorHandler(event) {
    let processor:string = event.target.innerHTML;
    $("#mac-details").html(this.userDevice.displayName + " "
      + this.userDevice.size + "\" " + this.userDevice.yearDisplay + " "+ processor);

    $("#processor").addClass("hide");
    $("#maclist").removeClass("hide");


    let processorOriginal = processor.replace(" Ghz","-ghz").replace(".", "-").toLowerCase();

    this.macData = this.macData.filter(
      data => {
        data.name = Utils.toUpperCaseFirstLetter(data.name);
        return data.processor === processorOriginal;
      }
    );
  }
}
