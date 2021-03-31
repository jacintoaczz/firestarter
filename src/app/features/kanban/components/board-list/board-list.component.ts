import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { Board } from '../../board';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogComponent } from '../../dialogs/board-dialog.component';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit, OnDestroy {
  boards: Board[] = [];
  boardSubscription!: Subscription;

  constructor(public _boardService: BoardService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.boardSubscription = this._boardService
      .getUserBoards()
      .subscribe((boards: Board[]) => (this.boards = boards));
  }

  ngOnDestroy(): void {
    // To avoid data leaks and database usage.
    this.boardSubscription.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this._boardService.sortBoards(this.boards);
  }

  openBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        let newBoard: Board = {
          title: result,
          priority: this.boards.length,
          tasks: [
            {
              label: 'purple',
              description: 'New task!',
            },
          ],
        };
        this._boardService.createBoard(newBoard);
      }
    });
  }
}
