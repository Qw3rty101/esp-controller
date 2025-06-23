import { useDataStore } from "@/store/useDataStore";
import { RiGeminiLine } from "react-icons/ri";
import { HiSparkles } from "react-icons/hi2";
import { useState, useRef, useEffect } from "react"; // Tambahkan useRef dan useEffect
import "@/css/weather-ai.css";
import { axiosInstance } from "@/lib/axios";

import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { getTimePeriod } from "@/utils/themeUtils";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";



interface Message {
	text: string;
	sender: "user" | "assistant";
}

const WeatherAi = () => {
	const { dataUser } = useDataStore();
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);

	// Tambahkan ref untuk chat body
	const chatBodyRef = useRef<HTMLDivElement>(null);

	// Periode Time
	const timePeriod = getTimePeriod();

	// Fungsi untuk auto-scroll ke bawah
	const scrollToBottom = () => {
		if (chatBodyRef.current) {
			chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
		}
	};

	// Jalankan scrollToBottom setiap messages berubah
	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const sendMessage = async () => {
		if (!input.trim()) return;

		const userMsg = { text: input, sender: "user" as const };
		setMessages((prev) => [...prev, userMsg]);
		setInput("");
		setLoading(true);

		try {
			const res = await axiosInstance.post("/send-message-ai-weather", { message: userMsg.text });

			const aiResponse = typeof res.data === "string"
				? res.data
				: res.data.response || "Maaf, tidak ada jawaban dari AI.";

			setMessages((prev) => [
				...prev,
				{ text: aiResponse, sender: "assistant" },
			]);
		} catch (err) {
			console.error("❌ Gagal kirim ke AI:", err);
			setMessages((prev) => [
				...prev,
				{ text: "❌ Gagal mendapatkan balasan dari AI.", sender: "assistant" },
			]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="weather-ai">
				<span className="ai-icon">
					<RiGeminiLine />
				</span>
				<p>
					Tanya apa aja tentang cuaca di <b>{dataUser?.location_name}</b>
				</p>
				<button className="ai-button" onClick={() => setIsOpen(true)}>
					Tanya Ai <HiSparkles />
				</button>
			</div>

			{isOpen && (
				<div className="ai-modal">
					<div className={`ai-modal-header ai-modal-header-${timePeriod}`}>
						<h2>Asisten Cuaca</h2>
						<button onClick={() => setIsOpen(false)}>&times;</button>
					</div>

					{/* Tambahkan ref ke chat body */}
					<div className={`ai-modal-body ai-modal-body-${timePeriod}`} ref={chatBodyRef}>
						{messages.map((msg, index) => (
							<div
								key={index}
								className={`ai-chat-message ${msg.sender === "user" ? "user-message" : "assistant-message"}`}
							>
								{/* <Markdown>{msg.text}</Markdown> */}
								<Markdown
									components={{
										p: ({ node, ...props }) => <p style={{ textAlign: 'left', margin: '4px 0' }} {...props} />,
										ul: ({ node, ...props }) => <ul style={{ textAlign: 'left', margin: '4px 0', paddingLeft: '20px' }} {...props} />,
										li: ({ node, ...props }) => <li style={{ textAlign: 'left', margin: '2px 0' }} {...props} />,
										h1: ({ node, ...props }) => <h1 style={{ textAlign: 'left', margin: '4px 0' }} {...props} />,
										h2: ({ node, ...props }) => <h2 style={{ textAlign: 'left', margin: '4px 0' }} {...props} />,
										h3: ({ node, ...props }) => <h3 style={{ textAlign: 'left', margin: '4px 0' }} {...props} />,
										h4: ({ node, ...props }) => <h4 style={{ textAlign: 'left', margin: '4px 0' }} {...props} />,
										h5: ({ node, ...props }) => <h5 style={{ textAlign: 'left', margin: '4px 0' }} {...props} />,
										h6: ({ node, ...props }) => <h6 style={{ textAlign: 'left', margin: '4px 0' }} {...props} />,
										img: ({ node, ...props }) => <img style={{ maxWidth: '100%', height: 'auto' }} {...props} />,
										a: ({ node, ...props }) => <a style={{ color: 'blue' }} {...props} />,
										strong: ({ node, ...props }) => <strong style={{ fontWeight: 'bold' }} {...props} />,
										em: ({ node, ...props }) => <em style={{ fontStyle: 'italic' }} {...props} />,
										code({ node, className, children, ...props }) {
											const match = /language-(\w+)/.exec(className || "");
											return match ? (
												<SyntaxHighlighter
													language={match[1]}
													style={okaidia}
													PreTag="div"
													customStyle={{
														margin: 0,
														backgroundColor: '#2d2d2d',
														borderRadius: '4px',
														padding: '12px'
													}}
													showLineNumbers={false}
													wrapLines={true}
												>
													{String(children).replace(/\n$/, "")}
												</SyntaxHighlighter>
											) : (
												<code className={className} {...props}>
													{children}
												</code>
											);
										}
									}}
								>
									{msg.text}
								</Markdown>
							</div>
						))}
						{loading && <div className="ai-chat-message assistant-message">⏳ Mengetik...</div>}
					</div>

					<div className={`ai-modal-footer ai-modal-footer-${timePeriod}`}>
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Tanya sesuatu..."
							onKeyDown={(e) => e.key === "Enter" && sendMessage()}
						/>
						<button onClick={sendMessage} disabled={loading}>
							{loading ? "Mengirim..." : "Kirim"}
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default WeatherAi;