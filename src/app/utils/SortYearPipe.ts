/**
* Created by Mtui on 11/7/16.
*/
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
name: "sortYear"
})

export class SortByYear implements PipeTransform{
  transform(years: string[]): any[] {
    const OFFSET:number  = 2006;
    const PERIOD:string[] = ["Early", "Mid", "Late"];

    var master = [];

    years.forEach((data)=>{

      let yArray:string[] = data.split(" ");
      let number:number = (parseInt(yArray[1]) - OFFSET);
      let date:string = yArray[0];
      if(master[number] === undefined)
        master[number] = [];
      master[number][PERIOD.indexOf(date)] = date;
    });

    let final:string[] = [];

    for(var i = 0; i < master.length; i ++) {

      if (master[i] !== undefined) {
        var year:string = "" + (i + OFFSET);
        for(var j = 0 ; j < PERIOD.length; j++) {
          if(master[i][j] !== undefined) {
            final.push(PERIOD[j] + " " + year);
          }
        }
      }
    }    
    return final;
  }
}
