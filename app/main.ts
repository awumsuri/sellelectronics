import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app-module.js";
import {DeviceService} from "./services/DeviceService.js";

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
