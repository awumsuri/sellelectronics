/**
 * Created by Mtui on 9/17/16.
 */
import {Component} from "@angular/core";
import {UserDevice} from "../model/UserDevice";
import {Router} from "@angular/router";
import {DeviceService} from "../services/DeviceService";
declare var $:any;

@Component({
    selector: 'main-view',
        template: `
                   
                    
                    <div class="container">
                      <div class="row">
                        <div class="page-header">
                              <h1>SELL YOUR MACBOOK</h1>
                              <span class="icon-bar">
                                <i class="glyphicon glyphicon-tower" aria-hidden="true"></i>
                              </span>                                         
                            </div>
                      </div>
                    </div>
                    <div class="selection">
                      <div class="logo-main" name="macbook-air">
                        <img src="/Images/macbook/Macbook-Air.jpg" data-name="macbook-air" (click)="clickhandler($event)"/>  
                         <span data-name="macbook-air">Macbook Air</span>                          
                      </div> 
                      <div class="logo-main" name="macbook" >
                        <img src="/Images/macbook/Macbook.png" data-name="macbook"(click)="clickhandler($event)"/>  
                        <span data-name="macbook">Macbook</span>
                      </div> 
                      <div class="logo-main" name="macbook-pro">
                        <img src="/Images/macbook/MacbookPro.png" data-name="macbook-pro"(click)="clickhandler($event)"/>
                        <span data-name="macbook-pro">Macbook Pro</span>
                      </div>                       
                    </div>                                       
                  `,
})

export class MainView {

  constructor(private userDevice:UserDevice,
              private router:Router,
              private deviceService:DeviceService) {}

  clickhandler(event) {
    let button:HTMLImageElement = event.target;
    this.userDevice.make = button.dataset['name'];
    this.userDevice.resourceUrl = button.src;
    this.userDevice.displayName = $("[data-name=\""+this.userDevice.make+"\"]")[1].innerHTML;

    this.router.navigate(["maclist"]);
  }
}

