import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from '../../_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @ViewChild('messageForm') messageForm?: NgForm;

  @Input() username?: string;
 // @Input() messages: Message[] = [];
 
  messageContent = '';
  loading = false;

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
   // this.loadMesssage();
    }



  sendMessage()
  {
    if (!this.username || !this.messageContent.trim()) return;

    this.loading = true;
    const trimmedMessageContent = this.messageContent.trim();

    this.messageService.sendMessage(this.username, trimmedMessageContent).then(() => {
      this.messageForm?.reset();
    }).finally(() => this.loading = false);

    //this.messageService.sendMessage(this.username, this.messageContent).subscribe({

    //  next: message => {
    //    //this.messages.push(message);
    //    //this.messageForm?.reset();


    //  }
    //  })
  }




  //loadMesssage()
  //{
  //  if (this.name)
  //  {

  //    this.messageService.getMessageThread(this.name).subscribe({

  //      next: messages =>
  //        this.messages = messages
  //      })
  //  }
  //}
}
