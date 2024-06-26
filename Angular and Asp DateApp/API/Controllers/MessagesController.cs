﻿
using API.Extensions;
using API.Interface;
using Microsoft.AspNetCore.Mvc;
using API.Entities;
using API.DTOs;
using API.Helpers;
using AutoMapper;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace API.Controllers
{

    
    // api/ controller name

    public class MessagesController : BaseApiController
    {

   
        private readonly IUserRepository _userRepository;
        private readonly IMessageRepository _messageRepository;
        private readonly IMapper _mapper;

        public MessagesController(IUserRepository userRepository, IMessageRepository messageRepository , IMapper mapper)
        {
            _messageRepository = messageRepository;
            _userRepository = userRepository;
            _mapper = mapper;
           
        }


        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto) 
        {


          
            var username = User.GetUsername();
           // var username = "todd";
           
           

            if (username == createMessageDto.RecipientUsername.ToLower()) 
            {
                return BadRequest("You cannot send message to yourself");
            }

            var sender = await _userRepository.GetUserByUserNameAysnc(username);
            var recipient = await _userRepository.GetUserByUserNameAysnc(createMessageDto.RecipientUsername);
            

           if( recipient == null) return NotFound();

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                Content = createMessageDto.Content

            };

            _messageRepository.AddMessage(message);

            if(await _messageRepository.SaveAllAsync()) return Ok(_mapper.Map<MessageDto>(message));

            return BadRequest("failed to send message");

        }

        [HttpGet]
        public async Task<ActionResult<PagedList<MessageDto>>> GetMessageforUser([FromQuery]MessageParams messageParams) 
        {
        
        messageParams.Username= User.GetUsername();

            var messages = await _messageRepository.GetMessagesForUser(messageParams);

            Response.AddPaginationHeader(new PaginationHeader(messages.CurrentPage , messages.PageSize
                ,messages.TotalCount , messages.TotalPages));


            return messages;
        }

        [HttpGet("thread/{username}")]
        public async Task<ActionResult<PagedList<MessageDto>>> GetMessageThread(string username)
        {

          var currentUserName = User.GetUsername();

          



            return Ok(await _messageRepository.GetMessageThread(currentUserName , username));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id)
        {
            var username = User.GetUsername();

            var message = await _messageRepository.GetMessage(id);

            if (message.SenderUsername != username && message.RecipientUsername != username)
                return Unauthorized();

            if (message.SenderUsername == username) message.SenderDeleted = true;
            if (message.RecipientUsername == username) message.RecipientDeleted = true;

            if (message.SenderDeleted && message.RecipientDeleted)
            {
              _messageRepository.DeleteMessage(message);
            }

            if (await _messageRepository.SaveAllAsync()) return Ok();

            return BadRequest("Problem deleting the message");

        }

    }
}
