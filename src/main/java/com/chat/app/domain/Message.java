package com.chat.app.domain;

public class Message {
	private String user;
	private String content;

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	public Message() {
		super();
	}

	public Message(String user, String content) {
		super();
		this.user = user;
		this.content = content;
	}
	
}

