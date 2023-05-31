import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  cell:string[][]=[["X","X","X"],["X","X","X"],["X","X","X"]];
  player1=0;
  player2=0;
  s:string="X";
  mach:boolean=false;
  constructor() {}
  a(n){
    if(document.getElementsByTagName("td")[n].style.opacity==""){
      this.changeOp(n);
      this.changeX();
      this.result1();
      if(this.mach==true){
        this.result2();
        this.changeX();
        this.result1();
      }
    } 
  }

  changeOp(p){
    document.getElementsByTagName("td")[p].style.opacity="1";
  }

  changeX(){
    for (let i = 0;i < this.cell.length; i++)
      for (let j = 0; j < this.cell.length; j++)
        if(document.getElementsByTagName("td")[(i*3)+j].style.opacity=="")
          if(this.cell[i][j]=="X"){
            this.cell[i][j]="O"; 
            this.s="X";
          }
          else{
            this.cell[i][j]="X";
            this.s="O";
          }    
  }
  result2(){
    for (let i = 0;i < this.cell.length; i++)
      for (let j = 0; j < this.cell.length; j++)
        if(document.getElementsByTagName("td")[(i*3)+j].style.opacity==""){
          this.changeOp((i*3)+j);
          return;
        }
  }

  result1(){
    if((this.g(0,4,8)==true&&this.cell[0][0]==this.s&&this.cell[1][1]==this.s&&this.cell[2][2]==this.s)||
    (this.g(2,4,6)==true&&this.cell[0][2]==this.s&&this.cell[1][1]==this.s&&this.cell[2][0]==this.s)||
    (this.g(0,3,6)==true&&this.cell[0][0]==this.s&&this.cell[1][0]==this.s&&this.cell[2][0]==this.s)||
    (this.g(1,4,7)==true&&this.cell[0][1]==this.s&&this.cell[1][1]==this.s&&this.cell[2][1]==this.s)||
    (this.g(2,5,8)==true&&this.cell[0][2]==this.s&&this.cell[1][2]==this.s&&this.cell[2][2]==this.s)||
    (this.g(0,1,2)==true&&this.cell[0][0]==this.s&&this.cell[0][1]==this.s&&this.cell[0][2]==this.s)||
    (this.g(3,4,5)==true&&this.cell[1][0]==this.s&&this.cell[1][1]==this.s&&this.cell[1][2]==this.s)||
    (this.g(6,7,8)==true&&this.cell[2][0]==this.s&&this.cell[2][1]==this.s&&this.cell[2][2]==this.s)){
      if(this.s=="O")
        this.player2++;
      else if(this.s=="X")
        this.player1++;
        document.getElementsByTagName("audio")[0].src="assets/APPLAUSE.WAV";
        document.getElementsByTagName("audio")[0].play();
      this.refresh();
    }
    else if(this.fullClose()==true){
      document.getElementsByTagName("audio")[0].src="assets/LASER.WAV";
      document.getElementsByTagName("audio")[0].play();
      this.refresh();     
    }  
  }

  private refresh() {
    for (let i = 0; i < this.cell.length; i++)
      for (let j = 0; j < this.cell.length; j++) {
        this.cell[i][j] = this.s;
        document.getElementsByTagName("td")[(i * 3) + j].style.opacity = "";
      }
  }

  onePlayer(){
    document.getElementsByTagName("audio")[0].src="assets/DRUMROLL.WAV";
    document.getElementsByTagName("audio")[0].play();
    this.refresh();
    this.player1=0;
    this.player2=0;
    this.s="X";
    this.mach=true;
  }

  twoPlayer(){
    document.getElementsByTagName("audio")[0].src="assets/DRUMROLL.WAV";
    document.getElementsByTagName("audio")[0].play();
    this.refresh();
    this.player1=0;
    this.player2=0;
    this.s="X";
    this.mach=false;
  }

  g(a,b,c){
    return document.getElementsByTagName("td")[a].style.opacity=="1"&&
    document.getElementsByTagName("td")[b].style.opacity=="1"&&
    document.getElementsByTagName("td")[c].style.opacity=="1";
  }

  fullClose(){
    for (let i = 0;i < this.cell.length; i++)
      for (let j = 0; j < this.cell.length; j++)
        if(document.getElementsByTagName("td")[(i*3)+j].style.opacity=="")
          return false;
    return true;
  }
}