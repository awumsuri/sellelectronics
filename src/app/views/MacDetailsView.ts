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
              <div class="page-header">

                    <span class="icon-bar">
                      <i class="glyphicon glyphicon-tower" aria-hidden="true"></i>
                    </span>
                  </div>

                <div class="logo-main">
                  <img src="{{userDevice.resourceUrl}}" />
                  <span id="mac-details">{{userDevice.displayName}}</span>
                </div>
                <div id="screen-size" ngbDropdown class="btn-group" dropdown keyboardNav="true">
                  <button id="simple-btn-keyboard-nav" type="button" class="btn btn-primary" ngbDropdownToggle>
                    Screen Size <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" dropdownMenu role="menu" aria-labelledby="simple-btn-keyboard-nav">
                    <li *ngFor="let screen of macScreenSizes;" class="dropdown-item" (click)="screenHandler($event);" role="menuitem">
                      <a class="dropdown-item">{{screen}}</a>
                    </li>
                  </ul>
                </div>
                <div id="year" ngbDropdown class="btn-group hide" dropdown keyboardNav="true">
                  <button id="simple-btn-keyboard-nav" type="button" class="btn btn-primary" ngbDropdownToggle>
                    Select Year<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" dropdownMenu role="menu" aria-labelledby="simple-btn-keyboard-nav">
                    <li *ngFor="let year of macYear | sortYear" class="dropdown-item" (click)="yearHandler($event);" role="menuitem">
                      <a class="dropdown-item">{{year}}</a>
                    </li>
                  </ul>
                </div>
                <div id="processor" ngbDropdown class="btn-group hide" dropdown keyboardNav="true">
                  <button id="simple-btn-keyboard-nav" type="button" class="btn btn-primary" ngbDropdownToggle>
                    Processor<span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" dropdownMenu role="menu" aria-labelledby="simple-btn-keyboard-nav">
                    <li *ngFor="let processor of macProcessor | sort" class="dropdown-item" (click)="processorHandler($event);" role="menuitem">
                      <a class="dropdown-item">{{processor}}</a>
                    </li>
                  </ul>
                </div>
                <div id="maclist" *ngFor="let mac of macData" class="panel panel-success hide">
                  <div class="panel-heading">
                    <h2 class="panel-title">{{mac.name}}</h2>
                  </div>
                  <div class="panel-body">
                    <h1 class="panel-primary">$ {{price}}</h1>
                    <ngb-alert id="flawless-alert" type="success">
                       <ul class="description perfect">
                         <li class="headline" style="color: black;"><h4>Flawless means <strong>all</strong> of these are true:</h4></li>
                         <li class="descriptionLi">Works perfectly</li>
                         <li class="descriptionLi">No noticeable flaws, still in its package or looks like new</li>
                         <li class="descriptionLi">Has zero scratches or scuffs</li>
                       </ul>
                     </ngb-alert>
                     <ngb-alert id="broken-alert" type="danger" dismissible="false" closable="false" class="hide">
                       <ul class="description poor">
                           <li class="headline"><h4>Choose this if your phone powers <strong>on</strong> and <strong>any</strong> of the following of these are true:</h4></li>
                         <li class="descriptionLi">Cracked screen or body</li>
                         <li class="descriptionLi">Broken or cracked hardware</li>
                         <li class="descriptionLi">Missing buttons or parts</li>
                       </ul>
                      </ngb-alert>
                    <button type="button" class="btn btn-primary btn-xs btn-update btn-add-card" (click)="flawlessHandler($event);">Flawless</button>
                    <button type="button" class="btn btn-danger btn-xs btn-update btn-add-card" (click)="brokenHandler($event)">Broken</button>
                    <span class='glyphicon glyphicon-exclamation-sign text-danger pull-right icon-style'></span>
                  </div>
                </div>
                <p id="warning" class="hide">Please Note: We do not pay for devices that have been reported lost or stolen.</p>
            `
})
export class MacDetailsView {

  private macData: GazelleDAO[] = [];
  private macScreenSizes: string[] = [];
  private macYear: string[] = [];
  private macProcessor: string[] = [];
  private price:number;
  private currectDevice: GazelleDAO;


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
    $("#warning").removeClass("hide");

    let processorOriginal = processor.replace(" Ghz","-ghz").replace(".", "-").toLowerCase();

    this.macData = this.macData.filter(
      data => {
        data.name = Utils.toUpperCaseFirstLetter(data.name);
        return data.processor === processorOriginal;
      }
    );

    this.price = this.macData[0].priceFlawless;
    setTimeout(() => {
        $("#maclist").removeClass("hide");
    }, 0);
  }

  brokenHandler(event) {
    $("#broken-alert").removeClass("hide");
    $("#flawless-alert").addClass("hide");
    this.price = this.macData[0].priceBroken;
  }

  flawlessHandler(event) {
    $("#broken-alert").addClass("hide");
    $("#flawless-alert").removeClass("hide");
    this.price = this.macData[0].priceFlawless;

  }
}
