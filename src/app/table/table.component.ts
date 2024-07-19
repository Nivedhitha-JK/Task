import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { UserService } from '../service/user.service';
import { MatSort } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule,MatPaginator,MatIconModule,CommonModule,MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit{

  displayedColumns: string[] = ['username', 'email', 'password', 'phone',
    'designation','city','state','gender','action'
  ];
  dataSource = new MatTableDataSource<any>;


  initialPageSize = 5;
  currentPageSize = this.initialPageSize;
  totalDataLength = 0;
  allData: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private userService:UserService,private router:Router){}

  ngOnInit(){
    this.getUserList();
  }


  getUserList(){
    this.userService.getUser().subscribe((res) => {
      console.log(res);
      this.allData = res;
      this.totalDataLength = this.allData.length;
      this.updateDataSource();
      // this.dataSource = new MatTableDataSource(res.slice(0,this.currentPageSize));
      this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
    })
  }


  updateDataSource(){
    this.dataSource.data = this.allData.slice(0,this.currentPageSize);
  }

  readMore(){
    this.currentPageSize += this.initialPageSize;
    // this.userService.getUser().subscribe((res) => {
    //   this.dataSource.data = res.slice(0, this.currentPageSize);
    // })
    this.updateDataSource();
  }


  readLess(){
    this.currentPageSize = this.initialPageSize;
    this.updateDataSource();
  }

  canLoadMore():boolean{
    return this.currentPageSize < this.totalDataLength;
  }



  editUser(user:any){
    // console.log(user,'user to edit');
   this.router.navigate(['/form',{data: JSON.stringify(user)}]);
  }

  deleteUser(id:number){
  window.alert('Are you sure to delete this data?');
  this.userService.deleteUserApi(id).subscribe((res) => {
    console.log('User Deleted!');
    window.alert('User Deleted');
    this.getUserList();
  })
  }




}


// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
//   {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
//   {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
//   {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
//   {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
//   {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
//   {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
//   {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
//   {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
//   {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];
