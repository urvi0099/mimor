import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { NavigationService } from '../../services/navigation.service';
import { AlertService } from '../../services/alert.service';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput, FullCalendarComponent } from '@fullcalendar/angular';
import { API } from '../../shared/constants/api.constants';
import { ERROR } from '../../shared/constants/errors.constants';

@Component({
  selector: 'app-area-calendar',
  templateUrl: 'building-area-calendar.page.html',
  styleUrls: ['building-area-calendar.page.scss'],
})
export class BuildingAreaCalendarPage implements OnInit, ViewWillEnter {

  public buildName;
  public buildId = this.route.snapshot.paramMap.get('buildId');
  public areas = [];
  public area;
  public areaName;
  public times = [];
  public weekTimes = [];
  public dayTimeslots = [];
  public renderModal = [];
  public dayCancelled = [];
  public dayTrades = [];
  public dayEvents = [];
  public allowBooking = true;
  public commonAriaTimeInterval;
  public timeInterval;
  public date;
  public modalClass = '';
  public modalClasses = '';
  public sorted = [false, false, false, false];
  public modalCoords = { top: null, left: null, bottom: null, right: null };
  public dayModalVisible = false;
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
  public firstRender = true;

  public calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'today',
      right: 'prev,next',
      center: 'title',
    },
    initialView: 'dayGridMonth',
    initialEvents: [], // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    showNonCurrentDates: false,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    dayCellContent: this.dayRender.bind(this),
    dateClick: this.dayClick.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];
  @ViewChild(FullCalendarComponent) calendar: FullCalendarComponent;
  public tradesLoaded = false;
  public bookings = [];
  public apartments = [];
  public areaId = this.route.snapshot.paramMap.get('areaId');
  public building;
  public total;
  public eventSources = [];
  public tradeSources = [];
  public hour;
  public min;
  public bookingType = 'common_area';
  public events = [];
  public calendarApi;
  public dom: HTMLElement = this.elementRef.nativeElement;
  public event;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService,
    private elementRef: ElementRef) {
    console.log('building area calendar constructor');
  }

  ngOnInit() {
    if (this.buildId) {
      this.getBuilding();
      this.getCalendar();
      this.getType();
    } else this.router.navigateByUrl('manager/buildings')
  }

  public createEventId() {
    return String(this.eventGuid++);
  }

  public ionViewWillEnter(): void {
    this.calendar.getApi().updateSize();
  }

  public getBuilding() {
    this.apiService.post(API.manager.showCommonAreas + this.buildId).subscribe((response) => {
      if (response.status) {
        // this.pageLoading = false;
        this.building = response.building;
        this.buildName = this.building.name;
        if (this.areaId !== undefined) {
          this.building.common_areas.forEach((val, index) => {
            if (val.id == this.areaId) {
              this.areaName = val.name;
              return false;
            }
          });
        }
      } else {
        this.alert.show(response.message || ERROR.internal);
        this.router.navigateByUrl('manager/dashboard/' + this.buildId);
      }
    });
  }

  public getType() {
    this.apiService.get(API.manager.getTimesType + this.areaId + '/commonAria').subscribe((res) => {
      if (res.result) {
        this.commonAriaTimeInterval = res.type;
        this.timeInterval = res.type;
      }
      this.getTimes();
    });
  }

  public getTimes() {
    this.apiService.get(API.manager.getTimes + this.timeInterval).subscribe((res) => {
      if (res.result) {
        let time = '',
          sep = ':';

        for (let i in res.data) {
          time = res.data[i].from + sep + res.data[i].from_min + ' ' + res.data[i].day_part_from + ' - ' +
            res.data[i].to + sep + res.data[i].to_min + ' ' + res.data[i].day_part_to;
          this.times.push({
            id: res.data[i].id,
            time: time
          });
        }
      }
      this.getCommonAreaTimes();
    });
  }

  public getCommonAreaTimes() {
    this.apiService.post(API.manager.getCommonAreaTimeslots + this.buildId, {
      area_id: this.areaId
    }).subscribe((response) => {
      this.weekTimes = response.common_area_timeslots;
      this.weekTimes.map(el => {
        let time = this.times.find(tm => tm.id === el.time_id);
        el.time = time.time;
      })
      this.allowBooking = response.common_area.allow_booking === '1';
    });
  }

  public getCalendar() {
    if (!this.tradesLoaded) {
      this.apiService.get(API.manager.getActiveBookings + this.buildId)
        .subscribe((response) => {
          this.bookings = response.bookings;
          this.apartments = this.bookings.map(booking => booking.apartment);
          this.apiService.get(API.manager.getCalendar + this.buildId + `?area_id=${this.areaId}&type=${this.bookingType}`).subscribe((response) => {
            if (response.status) {
              let i;
              this.building = response.building;
              this.total = response.total;
              for (i in response.data) {
                let status,
                  start,
                  end;
                if (response.data[i].status == "active") {
                  status = 'Active';
                  start = response.data[i].date_from;
                  end = response.data[i].date_to;
                }
                if (response.data[i].status == "expired") {
                  status = 'Expired';
                  start = response.data[i].date_from;
                  end = response.data[i].date_to;
                }
                const apartment = this.apartments.find(ap => ap.id === response.data[i].apartment_id);
                if (response.data[i].date_from != undefined || response.data[i].date_to != undefined) {
                  this.eventSources[i] = {
                    title: 'Area name: ' + response.data[i].name,
                    start: start.replaceAll('/', '-'),
                    end: end.replaceAll('/', '-'),
                    status,
                    areaid: response.data[i].id,
                    apartment: apartment ? apartment.name : null,
                    areaname: response.data[i].name,
                    datefrom: response.data[i].date_from,
                    dateto: response.data[i].date_to,
                    user: response.data[i].user.name,
                    times: `${this.formatDateForCalendar(start)} - ${this.formatDateForCalendar(end)}`,
                  }
                }
              }
              if (response.data_trades.length > 0) {
                for (let j in response.data_trades) {
                  const trade = response.data_trades[j];
                  let status,
                    start,
                    end;
                  if (parseInt(trade.date_end.slice(0, 4)) > 2100) {
                    status = '24/7';
                  } else {
                    status = 'Trade';
                  }
                  start = trade.date_start.replaceAll('/', '-');
                  end = trade.date_end.replaceAll('/', '-');
                  this.tradeSources[j] = {
                    start,
                    end,
                    status,
                    datefrom: start.slice(0, 10),
                    dateto: end,
                    user: trade.trade.name,
                    id: trade.trade.id,
                    trade: trade.trade.service.name,
                    times: `${this.formatDateForCalendar(start)} - ${this.formatDateForCalendar(end)}`,
                    starttime: `${this.formatDateForCalendar(start)}`
                  }
                }
              }
              this.events = this.eventSources.concat(this.tradeSources);
              this.calendarApi = this.calendar.getApi();
              // this.calendarApi.removeAllEventSources();
              // this.calendarApi.addEventSource(this.events);
              console.log(this.events);
              if (this.firstRender) {
                this.tradesLoaded = true;
                setTimeout(() => {
                  this.calendarApi.prev();
                  this.calendarApi.next();
                  this.firstRender = false;
                }, 2000)
              }
            } else {
              this.alert.show(response.message || ERROR.internal);
            }
          });
        }
        )
    }
  }

  public dayClick(info) {
    console.log(info, this.event);
    let date = info.date;
    const centerDistW = window.innerWidth / 2 - this.event.pageX;
    const centerDistH = window.innerHeight / 2 - this.event.pageY;
    let position;
    if (centerDistW >= 0 && centerDistH >= 0) {
      position = 'top left';
    } else if (centerDistW >= 0 && centerDistH < 0) {
      position = 'bottom left';
    } else if (centerDistW < 0 && centerDistH >= 0) {
      position = 'top right';
    } else position = 'bottom right';
    if (this.event.target.className.includes('ev-cell')) {
      const rect = this.event.target.getBoundingClientRect();
      this.modalCoords.top = rect.top - 100 + 'px';
      if (position.includes('left')) {
        this.modalCoords.left = rect.left + rect.width + 10 + 'px';
        this.modalCoords.right = null;
        this.modalClasses = 'left-tooltip';
      }
      if (position.includes('right')) {
        this.modalCoords.left = null;
        this.modalCoords.right = window.innerWidth - rect.right + rect.width + 10 + 'px';
        this.modalClasses = 'right-tooltip';
      }
      this.date = date;
      if (this.event.target.className.includes('booking-event')) {
        this.renderBookings(date);
        console.log(this.dayTimeslots)
        this.renderModal = this.dayTimeslots;
        this.dayModalVisible = true;
        this.modalClass = 'confirmed';
        this.modalClasses += ' confirmed';
      } else if (this.event.target.className.includes('cancel-event')) {
        this.renderBookings(date);
        this.renderModal = this.dayCancelled;
        this.dayModalVisible = true;
        this.modalClass = 'cancelled';
        this.modalClasses += ' cancelled';
      } else if (this.event.target.className.includes('trade-event')) {
        this.renderBookings(date);
        this.renderModal = this.dayTrades;
        this.dayModalVisible = true;
        this.modalClass = 'trade';
        this.modalClasses += ' trade';
      };
    } else {
      this.renderBookings(date);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const today = new Date();
      const allowSum = this.dayTimeslots.reduce((acc, curr) => {
        let todayAllowed = true;
        if (date.getDate() === today.getDate()) {
          const convertTime = timeStr => {
            let [hours, modifier] = timeStr.split(' ');
            if (hours === '12:00') {
              hours = '00';
            }
            if (modifier === 'pm') {
              hours = parseInt(hours, 10) + 12;
            } else hours = parseInt(hours, 10);
            return hours;
          };
          if (convertTime(curr.time) < today.getHours()) {
            todayAllowed = false;
          }
        }
        if (curr && !curr.event && todayAllowed && this.allowBooking) acc = ++acc;
        return acc;
      }, 0);
      if (date > yesterday && allowSum > 0) {
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        this.router.navigateByUrl(`manager/building/${this.buildId}/book/${this.areaId}/time?date=${dateString}`);
      }
    }
  }

  public dayRender(date, cell) {
    this.renderBookings(date.date);
    const bookSum = this.dayTimeslots.reduce((acc, curr) => {
      if (curr && curr.event) acc = ++acc;
      return acc;
    }, 0);
    const cancSum = this.dayCancelled.reduce((acc, curr) => {
      if (curr.event) acc = ++acc;
      return acc;
    }, 0);
    let isBook = false;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const today = new Date();
    const allowSum = this.dayTimeslots.reduce((acc, curr) => {
      let todayAllowed = true;
      if (date.date.getDate() === today.getDate()) {
        const convertTime = timeStr => {
          let [hours, modifier] = timeStr.split(' ');
          if (hours === '12:00') {
            hours = '00';
          }
          if (modifier === 'pm') {
            hours = parseInt(hours, 10) + 12;
          } else hours = parseInt(hours, 10);
          return hours;
        };
        if (convertTime(curr.time) < today.getHours()) {
          todayAllowed = false;
        }
      }
      if (curr && !curr.event && todayAllowed && this.allowBooking) acc = ++acc;
      return acc;
    }, 0);
    if (date.date > yesterday && allowSum > 0) {
      isBook = true;
    }
    const tradeSum = this.dayTrades.length;
    const bookDiv = bookSum > 0 ? `<div class="booking-event ev-cell ">${bookSum}</div>\n` : '';
    const cancDiv = cancSum > 0 ? `<div class="cancel-event ev-cell ">${cancSum}</div>\n` : '';
    const tradeDiv = tradeSum > 0 ? `<div #trade class="trade-event ev-cell" (click)="log($event)">${tradeSum}</div>\n` : '';
    const buttonDiv = isBook ? `<div class="calendar-day-book allowed">+ Book</div>\n` : '<div class="calendar-day-book">&nbsp;</div>\n';
    return {
      html: `
        <a class="fc-daygrid-day-number">${date.dayNumberText}</a>
        ${buttonDiv}
        <div class="event-wrap">
          ${bookDiv}
          ${cancDiv}
          ${tradeDiv}
        </div>
        `
    }
  }

  public catchClick(ev) {
    this.event = ev;
  }

  public renderBookings(date) {
    let events = this.events.filter((el) => {
      const dateEl = new Date(el.start.slice(0, 10));
      if (el.status === '24/7' && date > dateEl) {
        return el;
      }
      if (date.getFullYear() === dateEl.getFullYear() &&
        date.getMonth() === dateEl.getMonth() &&
        date.getDate() === dateEl.getDate()) {
        return el;
      }
    });
    const now = new Date();
    let cancelled = events.filter((el) => {
      if (new Date(el.dateto) <= now) {
        return el;
      }
    });
    let confirmed = events.filter((el) => {
      return !cancelled.includes(el)
    })
    this.dayEvents = events;
    let dayNum = date.getDay() === 0 ? 7 : date.getDay();
    this.dayTimeslots = [];
    this.dayCancelled = [];
    this.dayTrades = [];
    let indTimes = [];
    let dayTimes = this.weekTimes.filter(el => parseInt(el.day_id) === dayNum);
    dayTimes.sort((a, b) => {
      const aEl = a.time.split('-')[0];
      const bEl = b.time.split('-')[0];
      if (aEl.includes('pm') && !bEl.includes('pm')) {
        return 1;
      } else {
        const sorting = parseInt(bEl) === 12 ? false : parseInt(aEl) < parseInt(bEl);
        return sorting ? -1 : 1;
      }
    })
    dayTimes.forEach(el => {
      for (let i = 1; i <= el.num_of_bookings; i++) {
        indTimes.push(el.time);
        this.dayTimeslots.push({ time: el.time });
        this.dayCancelled.push({ time: el.time });
      }
    });
    this.dayEvents.forEach(ev => {
      if (ev.status === 'Trade') {
        if (!indTimes.includes(ev.times)) {
          this.dayTimeslots.push({ time: ev.times });
          this.dayCancelled.push({ time: ev.times });
        }
      }
      if (ev.status === '24/7') {
        this.dayTrades.push({ event: ev });
      }
    })
    this.dayTimeslots.sort((a, b) => {
      let aEl = a.time.split('-')[0];
      let bEl = b.time.split('-')[0];
      let aDate = new Date('1970/01/01 ' + aEl);
      let bDate = new Date('1970/01/01 ' + bEl);
      return aDate.getTime() - bDate.getTime()
    }).map((el => {
      for (let ev of confirmed) {
        if (ev && el && ev.times === el.time) {
          el.event = ev;
          confirmed.splice(confirmed.indexOf(ev), 1);
        }
      }
    }))
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (date <= yesterday) {
      this.dayTimeslots = this.dayTimeslots.filter(el => {
        if (el.event) {
          return el;
        }
      })
    }
    const today = new Date();
    if (date.getDate() === today.getDate()) {
      const convertTime = timeStr => {
        let [hours, modifier] = timeStr.split(' ');
        if (hours === '12:00') {
          hours = '00';
        }
        if (modifier === 'pm') {
          hours = parseInt(hours, 10) + 12;
        } else hours = parseInt(hours, 10);
        return hours;
      };
      this.dayTimeslots = this.dayTimeslots.filter(el => {
        if (convertTime(el.time) > today.getHours() && this.allowBooking || el.event) {
          return el;
        }
      })
    }
    this.dayCancelled.sort((a, b) => {
      let aEl = a.time.split('-')[0];
      let bEl = b.time.split('-')[0];
      let aDate = new Date('1970/01/01 ' + aEl);
      let bDate = new Date('1970/01/01 ' + bEl);
      return aDate.getTime() - bDate.getTime()
    }).map((el => {
      for (let ev of cancelled) {
        if (ev.times === el.time) {
          el.event = ev;
          cancelled.splice(cancelled.indexOf(ev), 1);
        }
      }
    }))
    // console.log(this.dayTimeslots, this.dayCancelled, this.dayTrades);
  }

  public bookTimeslot(slot) {
    if (!slot.event) {
      const timeId = this.weekTimes.find((el) => el.time === slot.time).time_id;
      const queryString = `/book-area/${this.buildId}/${this.areaId}/time?time=${timeId}`;
      const date = this.dayEvents[0].start.slice(0, 10).replaceAll('/', '-');
      this.router.navigateByUrl(`manager/building//${this.buildId}/book/${this.areaId}/time?time=${timeId}&date=${date}`)
    }
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

  handleDateSelect(selectInfo: DateSelectArg) {
  }


  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  public checkModal() {
    if (this.dayModalVisible) this.dayModalVisible = false;
  }

  public back(): void {
    this.router.navigateByUrl(`manager/building/${this.buildId}/common-areas/show`);
  }

  public submit(): void {
    this.router.navigateByUrl('manager/buildings')
  }


}

