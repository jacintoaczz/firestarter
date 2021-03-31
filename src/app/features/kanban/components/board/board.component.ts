import { Component, OnInit, Input } from '@angular/core';
import { Board, Task } from '../../board';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { BoardService } from '../../services/board.service';
import { TaskDialogComponent } from '../../dialogs/task-dialog.component';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() board!: Board;

  constructor(private _boardService: BoardService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this._boardService.updateTask(this.board.id, this.board.tasks);
  }

  openDialog(task?: Task, idx?: number): void {
    const newTask = { label: 'purple' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.board.id, idx }
        : { task: newTask, isNew: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.isNew) {
          this._boardService.updateTask(this.board.id, [
            ...this.board.tasks,
            result.task,
          ]);
        } else {
          const update = this.board.tasks;
          update.splice(result.idx, 1, result.task);
          this._boardService.updateTask(this.board.id, this.board.tasks);
        }
      }
    });
  }

  handleDelete() {
    this._boardService.deleteBoard(this.board.id);
  }
}
