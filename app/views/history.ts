/**
 * Created by Mtui on 9/19/16.
 */

import { Component } from '@angular/core';

@Component({
    selector: 'history',
    template: ` 
                <div class="history-noborder">
                <div class="rotate-right downbutton">
                        <img class="left" src="/Images/downbutton.jpg"/>
                  </div>
                    <div class="history-nav">                       
                     <div class="number-container">
                        <div class="current-index-on"><span class="number">1</span></div>
                        <div class="current-index-off"><span class="number">2</span></div>
                        <div class="current-index-off"><span class="number">3</span></div>                                              
                      </div>
                   </div>                
                </div>
                
`
})

export class History{}
