import { Component, OnInit, HostListener } from '@angular/core';
import { NetworkService } from '@services/network.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  images: string[] = [];
  numSelected = 0;

  @HostListener('window:keydown.arrowleft', ['$event'])
  arrowLeftPressed(event: KeyboardEvent) {
    this.imgSelected(this.images[0], this.images[1]);
  }

  @HostListener('window:keydown.a', ['$event'])
  aPressed(event: KeyboardEvent) {
    this.imgSelected(this.images[0], this.images[1]);
  }

  @HostListener('window:keydown.arrowright', ['$event'])
  arrowRightPressed(event: KeyboardEvent) {
    this.imgSelected(this.images[1], this.images[0]);
  }

  @HostListener('window:keydown.d', ['$event'])
  dPressed(event: KeyboardEvent) {
    this.imgSelected(this.images[1], this.images[0]);
  }

  constructor(private netService: NetworkService) { }

  ngOnInit(): void {
    this.netService.getRandomImgStrings().subscribe((res: any) => {
      console.log(res);

      if (res.images) {
        this.images = res.images;
      }
    });
  }

  imgSelected(imgName: string, lostName: string): void {
    this.netService.selectImg(imgName, lostName).subscribe((res: any) => {
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
