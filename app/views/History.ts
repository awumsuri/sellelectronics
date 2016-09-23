/**
 * Created by Mtui on 9/19/16.
 */

import { Component } from '@angular/core';
import {UserDevice} from "../model/UserDevice.js";

@Component({
    selector: 'history',
    template: ` 
                <div class="history-noborder">
                <div class="rotate-right downbutton">
                        <img class="left" src="/Images/downbutton.jpg"/>
                  </div>
                    <div class="history-nav">                       
                     <div class="number-container">
                        <div [ngClass]="getStyle(1)"><span class="number">1</span></div>
                        <div [ngClass]="getStyle(2)"><span class="number">2</span></div>
                        <div [ngClass]="getStyle(3)"><span class="number">3</span></div>                                              
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
