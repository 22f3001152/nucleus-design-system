import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { defineCustomElements } from "nucleus/loader";
import { DIRECTIVES } from "./nucleus-ng-component-library";

import { NucleusButton } from "./nucleus-ng-component-library/proxies";

const DECLARATIONS = [NucleusButton];

@NgModule({
  declarations: [DECLARATIONS],
  exports: [DECLARATIONS],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => defineCustomElements,
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NucleusComponentLibraryModule {}
