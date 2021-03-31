import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { Board, Task } from '../board';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(
    private _afAuth: AngularFireAuth,
    private _database: AngularFirestore
  ) {}

  /**
   *  Creates a new board for the current user.
   */
  async createBoard(data: Board) {
    const user = await this._afAuth.currentUser;
    return this._database.collection('boards').add({
      ...data,
      uid: user?.uid,
      // Default values
      tasks: [{ description: 'Hey there!', label: 'purple' }],
    });
  }

  /**
   *  Delete the chosen board.
   */
  deleteBoard(boardId: string | undefined) {
    return this._database.collection('boards').doc(boardId).delete();
  }

  /**
   *  Updates tasks on the board.
   */
  updateTask(boardId: string | undefined, tasks: Task[]) {
    return this._database.collection('boards').doc(boardId).update({ tasks });
  }

  /**
   * Removes a specific task from the board.
   */
  removeTask(boardId: string, task: Task) {
    return this._database
      .collection('boards')
      .doc(boardId)
      .update({
        tasks: firebase.default.firestore.FieldValue.arrayRemove(task),
      });
  }

  /**
   *  Gets the sorted boards for an specific user.
   */
  getUserBoards() {
    return this._afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this._database
            .collection<Board>('boards', (reference) =>
              reference.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' });
        }

        return [];
      })
    );
  }

  /**
   *  Run a batch write to chage the priority of each board for sorting purposes.
   */
  sortBoards(boards: Board[]) {
    const database = firebase.default.firestore();
    // We have to make sure that all the writes either succeed or fail together.
    // For that we create a batch.
    const batch = database.batch();
    const refs = boards.map((board) =>
      database.collection('boards').doc(board.id)
    );
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }
}
