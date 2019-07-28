const {of, pipe, from} = require('rxjs');
const {map, filter, tap, first, mergeMap, switchMap, switchAll, delay, concatMap} = require('rxjs/operators');

const getData = (param) => {
    return of(`retrieved new data with param ${param}`).pipe(
      delay(1000)
    )
}

// using map and switchAll
from([1,2,3,4]).pipe(
    switchMap(param => getData(param))
  ).subscribe(val => console.log(val));

// using mergeMap
from([1, 2, 3 ,4]).pipe(
    mergeMap(param => getData(param))
  ).subscribe(val => console.log('mergeMap:', val));

  // using concatMap
from([1, 2, 3 ,4]).pipe(
    concatMap(param => getData(param))
  ).subscribe(val => console.log('concatMap:', val));