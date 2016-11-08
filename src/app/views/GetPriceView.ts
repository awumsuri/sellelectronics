/**
 * Created by Mtui on 9/24/16.
 */
import { Component } from "@angular/core";
import {UserDevice} from "../model/UserDevice";
import {ConditionType} from "../model/ConditionType";
import {DeviceService} from "../services/DeviceService";
import {GazelleDAO} from "../model/GazelleDAO";
import {Device} from "../model/Device";
import {BaseView} from "./BaseView";

declare var $:any;

@Component({
    selector: "final-price",
    template: ` <topnav></topnav>
                <div class="app">
                 <div class="title-display">
                    <span class="heading-pharse">
                        <h2>CHOOSE DEVICE AND CARRIER FOR <span class="orange-title">{{userDevice.displayName}}</span></h2>
                     </span>
                  </div>
                   <history></history>  
                   <div>
                   

                   <div class="display-device center-border">
                         <img src="{{userDevice.resourceUrl}}"/>                        
                    </div>
                    <br>                    
                    <div class="carriers">
                    <ul>                      
                    <li  *ngIf="(deviceProperties | filterCarrierType:'at-t')">
                    
                    <div   class="make-menu att-menu">
                        <img name="at-t" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/carries/att.png"/>
                    </div>
                    </li>
                     <li *ngIf="(deviceProperties | filterCarrierType:'sprint')"><div   class="make-menu sprint-menu">
                        <img name="sprint" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/carries/sprint.png"/>
                    </div></li>
                    <li *ngIf="(deviceProperties | filterCarrierType:'verizon')">
                    <div  class="make-menu verizon-menu">
                        <img name="verizon" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/carries/verizon.png"/>
                    </div>
                    </li>
                    
                    <li *ngIf="(deviceProperties | filterCarrierType:'t-mobile')"> 
                      <div  class="make-menu tmobile-menu">
                          <img name="t-mobile" (mouseover)="over($event)" 
                          (mouseleave)="out($event)" 
                          (click)="clickHandler($event)" 
                          src="/Images/carries/tmobile.png"/>
                      </div>                      
                    </li>
                    <li *ngIf="(deviceProperties | filterCarrierType:'wifi')"> 
                      <div   class="make-menu tmobile-menu">
                          <img name="wifi" (mouseover)="over($event)" 
                          (mouseleave)="out($event)" 
                          (click)="clickHandler($event)" 
                          src="/Images/carries/wifiicon.png"/>
                      </div>                      
                    </li>
                    <li *ngIf="(deviceProperties | filterCarrierType:'unlocked')"> 
                      <div  class="make-menu unlocked-menu">
                          <img name="unlocked" (mouseover)="over($event)" 
                          (mouseleave)="out($event)" 
                          (click)="clickHandler($event)" 
                          src="/Images/carries/unlockedicon.png"/>
                      </div>                      
                    </li>                    
                    </ul>
                </div>
                </div>
               
                <div class="condition">     
                
                <div class="carriers inputs">  
                         <!-- <div class="condition-title"><span><h2>Condition</h2></span></div>-->
                         <!--<div class="input-container">
                         <input type="radio" (click)='conditionHandler($event);'  name="condition" value="GOOD">GOOD<br>
                        </div>-->
                        
                        <div class="input-container">
                         <input type="radio" (click)='conditionHandler($event)'  name="condition" value="FLAWLESS">FLAWLESS<br>
                        </div>
                        <div class="input-container">
                         <input type="radio" (click)='conditionHandler($event);' name="condition" value="BROKEN">BROKEN<br>                         
                        </div>      
                        
                        <div class="broken-buttons">
                            <span class="broken-button-title">DOES IT TURN ON ?</span>
                            <input type="radio" checked="true" (click)='conditionHandler($event);' name="turnson" value="YES">Yes
                            <input type="radio" checked="false" (click)='conditionHandler($event);' name="turnson" value="NO">No<br>                        
                        </div>
                </div>   
              
                </div>
                 <div class="broken-notes carriers">
                  <ul class="description perfect" style="display: none;">
                    <li class="headline" style="color: black;"><h4>Flawless means <strong>all</strong> of these are true:</h4></li>
                    <li class="descriptionLi">Works perfectly</li>
                    <li class="descriptionLi">No noticeable flaws, still in its package or looks like new</li>
                    <li class="descriptionLi">Has zero scratches or scuffs</li>
                  </ul>
                  <ul class="description poor" style="display: none;">
                      <li class="headline"><h4>Choose this if your phone powers <strong>on</strong> and <strong>any</strong> of the following of these are true:</h4></li>
                    <li class="descriptionLi">Cracked screen or body</li>
                    <li class="descriptionLi">Broken or cracked hardware</li>
                    <li class="descriptionLi">Missing buttons or parts</li>
                  </ul>
                </div>
                <div class="finalprice hide" >
                    <span><h2 [innerText]="price"></h2></span>                    
                </div>
                <div class="footer-push"></div>
                <p>Please Note: We do not pay for devices that have been reported lost or stolen.</p>
                </div>
                <footer></footer>                    
                `
})

export class GetPriceView extends BaseView {

    private gazelleData: GazelleDAO[];
    public price: string;
    private deviceProperties: GazelleDAO[] = [];

    ngOnInit() {
        this.userDevice.page = 3;
    }

    constructor(protected userDevice: UserDevice,
                private deviceService: DeviceService
                ) {

      super();

      this.gazelleData = this.deviceService.getGazelleData();
      this.deviceProperties = this.gazelleData.filter( device => {
        return device.make === this.userDevice.make;
      });
    }

    clickHandler(event) {

      this.userDevice.carrier = event.target.name;
      this.resetButtons();
      var button = event.target;
      this.over(event);

      button.selected = true;
      this.displayCondition(button);
    }

    displayCondition(button) {
      var isShowing  = ($(".condition").css(["display"]).display === "block") ? true : false;
      if (button)
        $(".condition").css("display", "block");
      if(isShowing){
        var event= {
          target: {
            value: $('input[name=condition]:checked').val()
          }
        };
        this.conditionHandler(event);
      }
    }

    getPrice(): GazelleDAO {
        for(var i = 0; i < this.gazelleData.length; i++) {
            var device: GazelleDAO = this.gazelleData[i];
            if(device.carrier === this.userDevice.carrier
                && device.make === this.userDevice.make
                && device.size === this.userDevice.size) {
                return device;
            }
        }
        return null;
    }

    errorPrice() {
      $(".finalprice").css("color", "red");
    }

    removeErrorPrice() {
      $(".finalprice").css("color", "green");
    }

    showBrokenPrice() {

    }

    conditionHandler(event) {
        var button  = event.target;
       // this.userDevice.condition = ConditionType[button.value];
        var device: GazelleDAO = this.getPrice();
        $(".input-container").css("margin-top", "10px");
        this.removeErrorPrice();
        $(".description.perfect").css("display", "block");
        $(".description.poor").css("display", "none");
        switch (button.value) {
            case "GOOD":
                if(device == null){
                  this.price = "N/A";
                  this.errorPrice();
                } else {
                  this.price = "$"+device.priceGood;
                  $(".broken-buttons").css("display", "none");
                }
                break;
            case "FLAWLESS":
                if(device == null) {
                  this.price = "N/A";
                  this.errorPrice();
                } else {
                  this.price = "$"+device.priceFlawless;
                  $(".broken-buttons").css("display", "none");
                }

                break;
            case "BROKEN":
                if(device == null) {
                  this.price = "N/A";
                  this.errorPrice();
                } else {
                  this.price = "--";
                  $(".broken-buttons").css("display", "block");
                  $(".input-container").css("margin-top", "0px");
                  var inputButtons = $(".broken-buttons input");
                  if(inputButtons[0].checked) {
                    if(device.priceBroken >= 0) {
                      this.price = "$" + device.priceBroken;
                    } else{
                      this.price = "$" + device.priceBrokenYes;
                    }

                  } else if (inputButtons[1].checked) {
                    if(device.priceBroken >= 0) {
                      this.price = "$" + device.priceBroken;
                    } else{
                      this.price = "$" + device.priceBrokenNo
                    }

                  }
                  $(".description.perfect").css("display", "none");
                  $(".description.poor").css("display", "block");
                }

                break;
            case "YES":
                if(device == null) {
                  this.price = "N/A";
                  this.errorPrice();
                } else {
                  $(".input-container").css("margin-top", "0px");
                  if(device.priceBroken >= 0) {
                    this.price = "$" + device.priceBroken;
                    return;
                  }
                  this.price = "$" + device.priceBrokenYes;
                }
                $(".description.perfect").css("display", "none");
                $(".description.poor").css("display", "block");
                break;
            case "NO":
                if(device == null) {
                  this.price = "N/A";
                  this.errorPrice();
                } else {

                  $(".input-container").css("margin-top", "0px");
                  if(device.priceBroken >= 0) {
                    this.price = "$" + device.priceBroken;
                    return;
                  }
                  this.price = "$" + device.priceBrokenNo;
                }
                $(".description.perfect").css("display", "none");
                $(".description.poor").css("display", "block");
                break;
        }
        $(".hide").css("display", "block");
    }
}
