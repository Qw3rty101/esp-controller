import { useEffect, useRef, useState } from "react";
import { HiSparkles } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

type Message = {
	role: "user" | "assistant";
	text: string;
};

const ChatModal = ({ onClose }: { onClose: () => void }) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const bottomRef = useRef<HTMLDivElement>(null);

	const sendMessage = async () => {
		if (!input.trim()) return;

		const newMessages = [...messages, { role: "user", text: input }] as Message[];
		setMessages(newMessages);
		setInput("");

		// Simulasi response AI
		setTimeout(() => {
			setMessages((newMessages) => [
				...newMessages,
				{ role: "assistant", text: "Ini jawaban AI tentang cuaca ☁️." },
			]);
		}, 1000);
	};

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col text-white">
			<div className="flex items-center justify-between p-4 border-b border-white/10">
				<h2 className="text-xl font-semibold flex items-center gap-2">
					<HiSparkles className="text-yellow-400" /> Cuaca AI
				</h2>
				<button onClick={onClose}>
					<IoClose className="text-2xl" />
				</button>
			</div>

			<div className="flex-1 overflow-y-auto p-4 space-y-3">
				{messages.map((msg, i) => (
					<div
						key={i}
						className={`max-w-xs px-4 py-2 rounded-lg ${
							msg.role === "user"
								? "bg-blue-600 self-end ml-auto"
								: "bg-white text-black self-start"
						}`}
					>
						{msg.text}
					</div>
				))}
				<div ref={bottomRef} />
			</div>

			<div className="p-4 border-t border-white/10">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						sendMessage();
					}}
					className="flex gap-2"
				>
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="flex-1 px-4 py-2 bg-white text-black rounded-lg"
						placeholder="Tanya soal cuaca hari ini..."
					/>
					<button
						type="submit"
						className="bg-blue-600 px-4 py-2 rounded-lg text-white font-semibold"
					>
						Kirim
					</button>
				</form>
			</div>
		</div>
	);
};

export default ChatModal;
