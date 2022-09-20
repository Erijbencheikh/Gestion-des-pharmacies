import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;
  constructor(
    public authService: AuthentificationService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {}
}
