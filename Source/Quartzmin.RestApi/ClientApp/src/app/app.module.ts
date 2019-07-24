import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarListComponent } from './calendars/calendar-list/calendar-list.component';
import { CalendarFormComponent } from './calendars/calendar-form/calendar-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { HistogramComponent } from './histogram/histogram.component';
import { TriggerListComponent } from './triggers/trigger-list/trigger-list.component';
import { JobFormComponent } from './jobs/job-form/job-form.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { ExecutionListComponent } from './executions/execution-list/execution-list.component';
import { JobHistoryComponent } from './history/job-history/job-history.component';
import { TriggerFormComponent } from './triggers/trigger-form/trigger-form.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { JobDataMapComponent } from './jobs/job-form/job-data-map/job-data-map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule, MatSelectModule } from '@angular/material';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    CalendarListComponent,
    CalendarFormComponent,
    DashboardComponent,
    JobListComponent,
    HistogramComponent,
    TriggerListComponent,
    JobFormComponent,
    ConfirmationDialogComponent,
    ExecutionListComponent,
    JobHistoryComponent,
    TriggerFormComponent,
    MenuComponent,
    FooterComponent,
    JobDataMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatMenuModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
