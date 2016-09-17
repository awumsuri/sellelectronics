import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app-module.js";

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
