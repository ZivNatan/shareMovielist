import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  constructor(private moviesService: MoviesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }
  list = [];
  searchText = '';
  lastSearch = '';
  showLoader = false;
  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(res => {
      this.searchText = res.search;
      this.search();
    });


  }
  copy(): void{
    let url = window.location.href;
    if (url.indexOf('search') === -1){
       url = url + '?search=' + this.searchText;
    }

    const el = document.createElement('textarea');
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
  movieClicked(movieId: string): void {
    this.router.navigate(['/movie'], { queryParams: {id: movieId } });
  }
  search(): void {
    if (this.searchText && this.searchText.length >= 3 && this.searchText !== this.lastSearch ){
      this.showLoader = true;
      this.moviesService.getMovies(this.searchText).subscribe(res => {
            this.list = res.results;
            this.lastSearch = this.searchText;
            this.showLoader = false;
        },
        err => {
          this.showLoader = false;
          console.error(err);
        });

    }


  }
  trackByMethod(index: number, el: any): number {
    return el.id;
  }

}
