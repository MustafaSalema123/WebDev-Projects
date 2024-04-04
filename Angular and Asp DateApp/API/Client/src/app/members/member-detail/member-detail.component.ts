import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../_models/member';;
import { NgxGalleryAnimation,  NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/message';
import { PresenceService } from '../../_services/presence.service';
import { AccountService } from '../../_services/account.service';
import { take } from 'rxjs';
import { User } from '../../_models/user';
@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {

  //@ViewChild('memberTabs', { static: true }) memberTabs?: TabsetComponent;
  @ViewChild('memberTabs', { static: true }) memberTabs?: TabsetComponent;
  // member: Member | undefined;
  member: Member = {} as Member;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  activeTab?: TabDirective;
  messages: Message[] = [];
  user?: User;

  constructor( private accountService: AccountService, private route: ActivatedRoute,
    private messageService: MessageService, public presenceService: PresenceService, private router: Router) {

    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) this.user = user;
      }

    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

    ngOnDestroy(): void {
      this.messageService.stopHubConnection();
    }

  ngOnInit(): void {

 //    this.loadMember();

    this.route.data.subscribe({
      next: data => this.member = data['member']
    })
    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab'])
      }
    })

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
    this.galleryImages = this.getImages();
  

  }

  getImages() {
    if (!this.member) return [];
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      })
    }
    return imageUrls;
  }

  selectTab(heading: string)
  {

    if (this.memberTabs) {
      this.memberTabs.tabs.find(x => x.heading === heading)!.active = true
    }
  }

  //loadMember()
  //{
  //  var Username = this.route.snapshot.paramMap.get("username");
  //  if (!Username) return;
  //  this.memberService.getMember(Username).subscribe({
  //    next: member => {
  //      this.member = member;
  //      this.galleryImages = this.getImages();
  //    }
  //    })
  //}

  loadMessages() {
    if (this.member) {

      this.messageService.getMessageThread(this.member.userName).subscribe({

        next: messages =>
          this.messages = messages
      })
    }
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.user) {
      //this.loadMessages();
      this.messageService.createHubConnection(this.user, this.member.userName);
    } else {
      this.messageService.stopHubConnection();
    }
  }



}
