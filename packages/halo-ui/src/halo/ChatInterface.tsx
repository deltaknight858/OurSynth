"use client";

import React from "react";
import { cn } from "../lib/utils";

export interface ChatMessage {
	id: string;
	sender: string;
	content: string;
}

export interface ChatInterfaceProps {
	messages: ChatMessage[];
	onSend: (content: string) => void;
	className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSend, className }) => {
	const [input, setInput] = React.useState("");

	const handleSend = () => {
		if (input.trim()) {
			onSend(input);
			setInput("");
		}
	};

	return (
		<div className={cn("flex flex-col h-full", className)}>
			<div className="flex-1 overflow-y-auto p-2">
				{messages.map(msg => (
					<div key={msg.id} className={cn("mb-2", msg.sender === "user" ? "text-right" : "text-left")}>{msg.content}</div>
				))}
			</div>
			<div className="flex gap-2 p-2 border-t">
						<input
							className="flex-1 rounded border px-3 py-2 text-[rgb(var(--halo-fg))] bg-transparent focus:outline-none"
							value={input}
							onChange={e => setInput(e.target.value)}
							onKeyDown={e => e.key === "Enter" && handleSend()}
							placeholder="Type a message..."
						/>
				<button className="rounded px-4 py-2 bg-[rgb(var(--halo-primary))] text-white" onClick={handleSend}>Send</button>
			</div>
		</div>
	);
};

export default ChatInterface;
