// Module where we keep all the components that will be shared throught many places in the app.
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';

import { ShellComponent } from './components/shell/shell.component';

const components = [ShellComponent];
const modules = [CommonModule, MaterialModule, RouterModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
})
export class SharedModule {}
