import { Component, OnInit, Input } from '@angular/core';
import { Board } from '../../board';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BoardService } from '../../services/board.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() board!: Board;

  constructor(private _boardService: BoardService) {}

  ngOnInit(): void {}

  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this._boardService.updateTask(this.board.id, this.board.tasks);
  }
}
