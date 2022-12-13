import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { NavigationService } from '../../services/navigation.service';
import { AlertService } from '../../services/alert.service';
import { Calendar, CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput, FullCalendarComponent } from '@fullcalendar/angular';
import { ERROR } from '../../shared/constants/errors.constants';

@Component({
  selector: 'app-building-calendar',
  templateUrl: 'building-calendar.page.html',
  styleUrls: ['building-calendar.page.scss'],
})
export class BuildingCalendarPage implements OnInit, ViewWillEnter {

  public building;
  public buildId = this.route.snapshot.paramMap.get('buildId');
  public total;

  public eventGuid = 0;
  public TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
  public INITIAL_EVENTS: EventInput[] = [
    {
      id: this.createEventId(),
      title: 'All-day event',
      start: this.TODAY_STR
    },
    {
      id: this.createEventId(),
      title: 'Timed event',
      start: this.TODAY_STR + 'T12:00:00'
    }
  ];
  public calendarData = [];
  public eventSources = [];
  public events = [];
  public hour;
  public min;
  calendarApi: Calendar;
  public tooltipStyle = {};

  public calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'dayGridMonth,timeGridWeek,timeGridDay',
      right: 'today,prev,next',
      center: 'title',
    },
    initialView: 'dayGridMonth',
    // initialEvents: this.INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: false,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventMouseEnter: (args) => {
      this.tooltip = args.event._def.extendedProps.divdescription;
      this.tooltipStyle = {
        top: args.jsEvent.pageY - 85 + 'px',
        left: args.jsEvent.pageX - 90 + 'px',
      }
    },
    eventMouseLeave: () => {
      this.tooltip = '';
    }
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];
  @ViewChild(FullCalendarComponent) calendar: FullCalendarComponent;
  public tooltip = '';

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService) {
    console.log('building calendar constructor');
  }

  ngOnInit() {
  }

  public createEventId() {
    return String(this.eventGuid++);
  }

  public ionViewWillEnter(): void {
    if (this.buildId) {
      this.calendar.getApi().updateSize();
      this.getCalendar();
    } else this.router.navigateByUrl('manager/buildings');
  }

  handleDateSelect(selectInfo: DateSelectArg) {
  }

  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo.event)
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  public getCalendar() {
    this.apiService.get('/api/manager/getCalendar/' + 7 + '?type=building').subscribe(res => {
      console.log(res);
      if (res.status) {
        let i;
        this.building = res.building;
        this.total = res.total;

        for (let i in res.data) {
          let status,
            color,
            borderColor,
            textColor,
            start,
            end,
            className;

          if (res.data[i].status == 'moving') {
            status = 'Moving In';
            color = '#43a047';
            textColor = '#ffffff'
            borderColor = '#43a047';
            start = res.data[i].date_from;
            end = res.data[i].date_to;
            this.checkDate(start) ? className = 'past' : className = 'future';
          }

          if (res.data[i].status == 'moved') {
            status = 'Moved In';
            color = '#ffffff';
            borderColor = '#43a047';
            textColor = '#000000';
            start = res.data[i].date_from;
            end = res.data[i].date_to;
            this.checkDate(start) ? className = 'past' : className = 'future';
          }

          if (res.data[i].status_out == 'moving') {
            status = 'Moving Out';
            color = '#d81b60';
            borderColor = '#d81b60';
            textColor = '#ffffff',
              start = res.data[i].date_out_from;
            end = res.data[i].date_out_to;
            this.checkDate(start) ? className = 'past' : className = 'future';
          }

          if (res.data[i].status_out == 'moved') {
            status = 'Moved Out';
            color = '#ffffff';
            textColor = '#000000'
            borderColor = '#d81b60';
            start = res.data[i].date_out_from;
            end = res.data[i].date_out_to;
            this.checkDate(start) ? className = 'past' : className = 'future';
          }

          if (res.data[i].is_lift === 1) {
            status = 'Lift';
            color = '#1976d2';
            textColor = '#ffffff';
            borderColor = '#1976d2';
            if (res.data[i].status == 'moved') {
              color = '#ffffff';
              status = 'Lift Expired';
              textColor = '#000000';
              borderColor = '#1976d2';
            }
          }

          if (res.data[i].date_from != undefined || res.data[i].date_to != undefined) {
            this.events[i] = {
              title: 'Ap. #' + res.data[i].apartment.name + ' ' + res.data[i].user.name,
              start: start.replaceAll('/', '-'),
              end: end.replaceAll('/', '-'),
              divdescription: '<div class="fc-description"><span>Status: ' +
                status + '</span><br><span>User Type: ' +
                res.data[i].user_status + '</span><br></div>'
                + '<div>' + this.formatDateForCalendar(start) + ' - ' + this.formatDateForCalendar(end) + '</div>',
              description: 'Status: ' + res.data[i].status + '\n User Status: ' + res.data[i].user_status,
              color: color,
              status: status,
              id: res.data[i].id,
              borderColor: borderColor,
              textColor: textColor,
              className: className,
              display: 'block'
            }
          }
        };
        // $scope.isFirstRender = false;
        this.eventSources = this.events;
        this.calendarApi = this.calendar.getApi();
        this.calendarApi.removeAllEventSources();
        this.calendarApi.addEventSource(this.eventSources);
        console.log(this.eventSources);
      } else {
        this.alert.show(res.message || ERROR.internal);
      }
    })
  }

  public formatDateForCalendar(date) {
    const regex = /\d{4}\/\d{2}\/\d{2}\s+(\d{2}):(\d{2}):\d{2}/;
    this.hour = '';

    let parse = date.match(regex);
    if (parse === null) {
      return '';
    } else {
      this.hour = parseInt(parse[1], 10);
      this.min = parse[2] === undefined ? '' : parse[2];

      if (isNaN(this.hour) || isNaN(this.min)) {
        return '';
      }
    }

    if (parseInt(this.hour) == 0) {
      this.hour = '12' + ':' + this.min + ' am';
    } else if (this.hour == 12) {
      this.hour = '12' + ':' + this.min + ' pm';
    } else if (this.hour < 12) {
      this.hour += ':' + this.min + ' am';
    } else {
      this.hour -= 12;
      this.hour += ':' + this.min + ' pm';
    }

    return this.hour;

  }
  public checkDate(date) {
    let dateEv = new Date(date.slice(0, 10));
    let today = new Date();
    if (dateEv.getDate() < today.getDate() && !(dateEv.getFullYear() === today.getFullYear() &&
      dateEv.getMonth() === today.getMonth() && dateEv.getDay() === today.getDay())) {
      return true;
    }
    return false;
  }

  public back(): void {
    this.navigation.back();
  }

  public submit(): void {
    this.router.navigateByUrl('manager/buildings')
  }

}

