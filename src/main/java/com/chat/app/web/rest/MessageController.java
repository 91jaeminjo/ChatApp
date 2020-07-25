package com.chat.app.web.rest;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import com.chat.app.domain.Message;

@Controller
public class MessageController {

	
	@MessageMapping("/message")
	@SendTo("/topic/myTopic")
	public Message greeting(Message message) throws Exception{
		Thread.sleep(1000);//simulated delay
		return new Message(HtmlUtils.htmlEscape(message.getUser()),HtmlUtils.htmlEscape(message.getContent()));
	}
}

