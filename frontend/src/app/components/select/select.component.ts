import { Component, OnInit } from '@angular/core';
import { NetworkService } from '@services/network.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  images: string[] = [];
  numSelected = 0;

  constructor(private netService: NetworkService) { }

  ngOnInit(): void {
    this.netService.getRandomImgStrings().subscribe((res: any) => {
      console.log(res);

      if (res.images) {
        this.images = res.images;
      }
    });
  }

  imgSelected(imgName: string): void {
    this.netService.selectImg(imgName).subscribe((res: any) => {
      console.log(res);
      this.numSelected += 1;
      this.netService.getRandomImgStrings().subscribe((imgRes: any) => {
        if (imgRes.images) {
          this.images = imgRes.images;
        }
      });
    });
  }
}
