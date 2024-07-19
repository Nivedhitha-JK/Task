import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';

export const routes: Routes = [
    {path:'',redirectTo:'form',pathMatch:'full'},
    {path:'form',component:FormComponent},
    {path:'table',component:TableComponent}
];
