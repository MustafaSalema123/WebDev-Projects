import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AdminGuard } from './_guard/admin.guard';
import { AuthGuard } from './_guard/auth.guard';
import { PreventUnsavedChangedGuard } from './_guard/prevent-unsaved-changed.guard';
import { MemberDetailedResolver } from './_resolvers/member-detailed.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '', runGuardsAndResolvers: 'always', canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberListComponent, canActivate: [AuthGuard] },
      { path: 'members/:username', component: MemberDetailComponent, resolve: { member: MemberDetailedResolver } },
      { path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangedGuard] },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard] }]
  }, 

  { path: 'errors', component: TestErrorComponent },
  { path: '**', component: HomeComponent, pathMatch:'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }