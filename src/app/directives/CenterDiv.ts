/**
 * Created by Mtui on 10/7/16.
 */
import {Directive, Renderer, Input, HostListener, ElementRef} from "@angular/core"

@Directive({
  selector: "[centerDiv]"
})

export class CenterDiv{
  constructor(private el: ElementRef, private render:Renderer){
    render.setElementClass(el.nativeElement, "center-error", true);
  }

}
