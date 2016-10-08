/**
 * Created by Mtui on 10/8/16.
 */
import { Component } from "@angular/core";
import {UserDevice} from "../model/UserDevice";

declare var $: any;

@Component({
  selector: "base-view"
})

export class BaseView {

  constructor(protected userDevice: UserDevice){}

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

  resetButtons() {
    $(".make-menu").find("img").each( function(){
      this.src = this.src.replace("hover","");
      this.selected = false;
    });
  }
}
