import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NucleusComponentLibraryModule } from "nucleus-ng-component-library";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NucleusComponentLibraryModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
