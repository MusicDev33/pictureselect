import { Component, OnInit } from '@angular/core';
import { NetworkService } from '@services/network.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  results: {[key: string]: number}[] = [];
  total = 0;
  loaded = false;

  constructor(private netService: NetworkService) { }

  ngOnInit(): void {
    this.netService.getResults().subscribe((res: any) => {
      console.log(res);

      if (res.results) {
        this.results = res.results;

        this.results.forEach((result) => {
          this.total += result.value;
        });

        this.loaded = true;
      }
    });
  }

  calcScore(picked: number) {
    return (picked / this.total).toFixed(4);
  }

}
