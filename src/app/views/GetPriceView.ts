/**
 * Created by Mtui on 9/24/16.
 */
import { Component } from "@angular/core";
import {UserDevice} from "../model/UserDevice";
import {ConditionType} from "../model/ConditionType";
import {DeviceService} from "../services/DeviceService";
import {GazelleDAO} from "../model/GazelleDAO";

declare var $:any;

@Component({
    selector: "final-price",
    template: ` <topnav></topnav>
                <div class="app">
                 <div class="title-display">
                    <span class="heading-pharse">
                        <h2>CHOOSE DEVICE AND CARRIER</h2>
                     </span>
                  </div>
                   <history></history>
                   <span class="title-display-list"><h2>{{userDevice.name}}</h2></span>
                   <div class="display-device center-border">
                         <img src="{{userDevice.resourceUrl}}"/>                        
                    </div>
                    <br>
                    <span class="heading-middle"><h2>Carrier</h2></span>
                    <div class="carriers">
                    <ul>                      
                    <li><div  class="make-menu att-menu">
                        <img name="at-t" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/carries/att.png"/>
                    </div></li>
                     <li><div  class="make-menu sprint-menu">
                        <img name="sprint" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/carries/sprint.png"/>
                    </div></li>
                    <li>
                    <div  class="make-menu verizon-menu">
                        <img name="verizon" (mouseover)="over($event)" 
                        (mouseleave)="out($event)" 
                        (click)="clickHandler($event)" 
                        src="/Images/carries/verizon.png"/>
                    </div>
                    </li>
                    
                    <li> 
                      <div  class="make-menu tmobile-menu">
                          <img name="t-mobile" (mouseover)="over($event)" 
                          (mouseleave)="out($event)" 
                          (click)="clickHandler($event)" 
                          src="/Images/carries/tmobile.png"/>
                      </div>                      
                    </li>
                    <li> 
                      <div  class="make-menu tmobile-menu">
                          <img name="wifi" (mouseover)="over($event)" 
                          (mouseleave)="out($event)" 
                          (click)="clickHandler($event)" 
                          src="/Images/carries/wifiicon.png"/>
                      </div>                      
                    </li>
                    <li> 
                      <div  class="make-menu unlocked-menu">
                          <img name="unlocked" (mouseover)="over($event)" 
                          (mouseleave)="out($event)" 
                          (click)="clickHandler($event)" 
                          src="/Images/carries/unlockedicon.png"/>
                      </div>                      
                    </li>
                    
                    </ul>
                </div>
                <div class="condition">
                <span class="heading-middle"><h2>Condition</h2></span>
                <div class="carriers inputs">      
                         <div class="input-container">
                         <input type="radio" (click)='conditionHandler($event);'  name="condition" value="GOOD">GOOD<br>
                        </div>
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
                <div class="startbutton hide" >
                    <span [innerText]="price"  class="finalprice"></span>                    
                </div>
                <div class="footer-push"></div>
                </div>
                <footer></footer>                    
                `
})

export class GetPriceView {

    private gazelleData: GazelleDAO[];
    public price: string;

    ngOnInit() {
       this.userDevice.page = 3;
    }

    constructor(private userDevice: UserDevice,
                private deviceService: DeviceService) {
        this.gazelleData = deviceService.getGazelleData();
    }

    over(event) {
        var button = event.target;

        if(button.selected) return;

        var src = event.target.src;
        var indexExtentsion = src.indexOf(".png");
        var extention = src.slice(indexExtentsion);
        var newSource = src.slice(0, indexExtentsion) + "hover" + extention;

        button.setAttribute("src",newSource);
    }

    out(event) {
        var button = event.target;
        if (button.selected) return;

        button.src = button.src.replace("hover","");
    }

    clickHandler(event) {

        this.userDevice.carrier = event.target.name;
        this.resetButtons();
        var button = event.target;
        this.over(event);

        button.selected = true;
        this.displayCondition(button);
    }

    resetButtons() {
        $(".make-menu").find("img").each( function(){
            this.src = this.src.replace("hover","");
          this.selected = false;
        });
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

    conditionHandler(event) {
        var button  = event.target;
       // this.userDevice.condition = ConditionType[button.value];
        var device: GazelleDAO = this.getPrice();
        $(".input-container").css("margin-top", "10px");
        this.removeErrorPrice();
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
                break;
        }
        $(".hide").css("display", "block");
    }
}