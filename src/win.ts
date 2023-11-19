import { Observable, Subject } from "rxjs";

const winSubject: Subject<boolean> = new Subject();
export const win$: Observable<boolean> = winSubject.asObservable();