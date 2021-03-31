import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KanbanRoutingModule } from './kanban-routing.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { BoardComponent } from './components/board/board.component';
import { BoardListComponent } from './components/board-list/board-list.component';
import { BoardDialogComponent } from './dialogs/board-dialog.component';
import { TaskDialogComponent } from './dialogs/task-dialog.component';

const components = [BoardComponent, BoardListComponent];
const modules = [
  DragDropModule,
  FormsModule,
  KanbanRoutingModule,
  MatButtonToggleModule,
  MatDialogModule,
  SharedModule,
];

@NgModule({
  declarations: [...components, BoardDialogComponent, TaskDialogComponent],
  imports: [...modules],
})
export class KanbanModule {}
