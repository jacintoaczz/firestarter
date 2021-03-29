import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { Board } from '../../board';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit, OnDestroy {
  boards: Board[] = [];
  boardSubscription!: Subscription;

  constructor(public _boardService: BoardService) {}

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
}
