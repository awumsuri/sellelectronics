/**
 * Created by Mtui on 9/19/16.
 */

import { Component } from '@angular/core';
import {UserDevice} from "../model/UserDevice";

@Component({
    selector: 'history',
    template: ` 
                <div class="history-noborder">
                <div class="downbutton history">
                        <img class="left" src="/Images/leftarrowbutton.png"/>
                  </div>
                    <div class="history-nav">                       
                     <div class="number-container">
                        <ul>
                          <li><div [ngClass]="getStyle(1)"><span class="number">1</span></div></li>
                          <li><div [ngClass]="getStyle(2)"><span class="number">2</span></div></li>
                          <li><div [ngClass]="getStyle(3)"><span class="number">3</span></div></li>   
                        </ul>
                                                                  
                      </div>
                   </div>                
                </div>
                
`
})

export class History{
    private css: string ="current-index-on";

    constructor(private userDevice: UserDevice) {

    }

    getStyle(page: number) {
        if(page < this.userDevice.page)
            return "current-index-complete history-number";
        return (page === this.userDevice.page) ? "current-index-on history-number" : "current-index-off history-number";
    }



}
