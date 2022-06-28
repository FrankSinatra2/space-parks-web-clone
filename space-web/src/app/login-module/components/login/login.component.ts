import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, take, tap } from 'rxjs/operators';
import { isSuccess } from 'src/app/shared/models/remote-data.model';
import { NetworkService } from 'src/app/shared/services/network.service';


@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.scss'
    ]
})
export class LoginComponent implements OnInit {
 
    username: string = '';
    room: string = '';

    constructor(
        private readonly networkService: NetworkService,
        private readonly router: Router
    ) {

    }

    ngOnInit(): void {
        this.networkService.game$
            .pipe(
                filter(isSuccess),
                tap(x => console.log(x)),
                take(1)
            )
            .subscribe(_ => {
                this.router.navigate(['/game']);
            });
    }

    onJoinClicked(): void {
        this.networkService.joinGame(this.username, this.room);   
    }
}
