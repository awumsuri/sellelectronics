/**
 * Created by Mtui on 11/7/16.
 */
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "sortByYear"
})
export class ArraySortPipe implements PipeTransform{
  transform(yearArray: string[]): string[] {

  }
}
