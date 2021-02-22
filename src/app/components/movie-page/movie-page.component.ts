import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent implements OnInit {

  constructor( private activatedRoute: ActivatedRoute, private moviesService: MoviesService) { }

  id = '';
  extraData: IextraData = {
    cast: [],
    craw: []
  };
  showLoader = false;
  movie: Imovie = {
    adult: false,
    backdrop_path: '',
    genre_ids: [0],
    id: 0,
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0,
    production_companies: []

  };

  ngOnInit(): void {
    if (this.activatedRoute.queryParams){
     this.activatedRoute.queryParams.subscribe(res => {
        this.id = res.id;
        this.getAllData(this.id);
      });

    }
  }
  getAllData(id: string): void{

    this.showLoader = true;
    forkJoin([this.moviesService.getMovie(id), this.moviesService.getCrawAndCast(id)]).subscribe(res => {
        this.movie = res[0];
        this.extraData = res[1];
        this.showLoader = false;
    });

  }
}

interface IextraData{
  cast: any[];
  craw: any[];
}
interface Imovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  production_companies: any[];
}
