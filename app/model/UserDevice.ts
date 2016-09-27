/**
 * Created by Mtui on 9/20/16.
 */
import {Device} from "./Device"

export class UserDevice extends Device {
    public filterdData: Device[];
    public page: number;
    public displayData: Device[];

    constructor(){
        super(null, null, null, null, null, null, null);
    }
}
