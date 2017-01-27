import { Injectable } from '@angular/core';
import * as Datastore from 'nedb';
let remote = require('electron').remote;


export class Hero {
  constructor(public id: number, public name: string) { }
}

const HEROES: Hero[] = [
  new Hero(11, 'Mr. Nice'),
  new Hero(12, 'Narco'),
  new Hero(13, 'Bombasto'),
  new Hero(14, 'Celeritas'),
  new Hero(15, 'Magneta'),
  new Hero(16, 'RubberMan')
];



@Injectable()
export class HeroService {
   private heroDB: Datastore;

  constructor() {
    this.heroDB = remote.getGlobal('datastore');
    for (let hero of HEROES) {
      this.heroDB.insert(hero, function (err: any, doc: any) {
        console.log('Inserted', doc.name, 'with ID', doc._id);
      });
    }
  }


  getHeroes(): Promise<Array<Hero>> {
    return new Promise((resolve, reject) => {
      return this.heroDB.find({}, ((err: Error, inventarliste: Array<Hero>) => {
        if (err) {
          reject(err);
        } else {
          resolve(inventarliste);
        }
      }));
    })
  }

  public getHero(id: number | string): Promise<Hero> {
    return new Promise((resolve, reject) => {
      return this.heroDB.findOne({ id: id }, ((err: Error, hero: Hero) => {
        if (err) {
          reject(err);
        } else {
          console.log('Got', hero.name, 'with ID', hero.id);
          resolve(hero);
        }
      }));
    });
  }

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
