import { Utils } from './../../pages/miscellaneous/Utils/utils';
import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Contacts, RecentUsers, UserData } from '../data/users';

@Injectable()
export class UserService extends UserData {

  private time: Date = new Date;
  pessoaLogada = Utils.getSessionPessoa();

  private users = {
    pessoa: { name: this.pessoaLogada.nome, title: this.pessoaLogada.nome},
  };
  private types = {
    mobile: 'mobile',
    home: 'home',
    work: 'work',
  };
  private contacts: Contacts[] = [
    { user: this.users.pessoa, type: this.types.mobile },
  ];
  private recentUsers: RecentUsers[]  = [
    { user: this.users.pessoa, type: this.types.mobile, time: this.time.setHours(10, 45)},
  ];

  getUsers(): Observable<any> {
    return observableOf(this.users);
  }

  getContacts(): Observable<Contacts[]> {
    return observableOf(this.contacts);
  }

  getRecentUsers(): Observable<RecentUsers[]> {
    return observableOf(this.recentUsers);
  }
}
