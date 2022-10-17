import { CollectionViewer, DataSource } from '@angular/cdk/collections'
import { Hit } from '../main/interface/interfaces';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

export class ItemDataSource extends DataSource<Hit | undefined> {
  private itemsInMemory: Hit[] = []
  private itemChanges$: BehaviorSubject<Hit[]>;
  private destroy$: Subject<boolean> = new Subject()

  private pageSize: number = 2
  private lastLoadPage: number = 0

  constructor(private source:Hit[]) {
    super();
    this.itemChanges$ = new BehaviorSubject(this.itemsInMemory)
    this.getInformation()
  }

  connect(collectionViewer: CollectionViewer): Observable<readonly (Hit | undefined)[]> {
    collectionViewer.viewChange.pipe(
      takeUntil(this.destroy$)
    ).subscribe((range) => {
      const currentPage = Math.floor(range.end / this.pageSize)
      if (currentPage > this.lastLoadPage) {
        this.lastLoadPage = currentPage
        this.getInformation()
      }
    })
    return this.itemChanges$
  }
  getInformation() {
    for (let index = 0; index < this.pageSize; index++) {
      this.itemsInMemory = [
        ...this.itemsInMemory,
        this.source[Math.floor(Math.random() * this.source.length) + 1]
      ]
    }
    this.itemChanges$.next(this.itemsInMemory)
  }

  disconnect(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }

}