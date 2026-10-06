"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, User } from "lucide-react";
import { db } from "../services/db";

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! Welcome to IQ Education & Immigration. How can I assist you today? Let me know if you are interested in: \n1. Study Abroad \n2. Work Permit \n3. Visitor Visa",
      time: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [leadLogged, setLeadLogged] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: inputText,
      time: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Simulate Bot Response
    setTimeout(() => {
      let botText = "";
      const text = inputText.toLowerCase();

      if (text.includes("study") || text.includes("canada") || text.includes("uk") || text.includes("australia") || text.includes("student") || text.includes("university")) {
        botText = "We offer guidance for top study programs in Canada, Australia, UK, Germany, and New Zealand. Would you like to check your admission eligibility? Click 'Check Eligibility' at the top!";
      } else if (text.includes("work") || text.includes("permit") || text.includes("lmia") || text.includes("job") || text.includes("express")) {
        botText = "We support Skilled Worker programs, Express Entry, and LMIA verification. Please review our 'Work Permit' page or use the eligibility tool for a breakdown of your CRS points.";
      } else if (text.includes("visitor") || text.includes("tourist") || text.includes("family")) {
        botText = "We process Tourist and Family Visit visas with high success rates. Drop us your contact info in the chat and our visitor visa desk will call you!";
      } else if (text.includes("admin") || text.includes("dashboard") || text.includes("crm")) {
        botText = "Our administration team uses a dedicated CRM to track all requests. Please submit a form and they will get back to you.";
      } else {
        botText = "Thanks for sharing! I have logged your query. Our visa counselors will reach out to you on phone/email shortly. Please schedule a free consultation if you'd like an immediate slot.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: botText,
          time: new Date()
        }
      ]);

      // Log Lead dynamically in CRM!
      if (!leadLogged) {
        db.addLead({
          name: "Live Chat User",
          email: "chat.user@example.com",
          phone: "Live Chat Session",
          age: 25,
          education: "B.Tech / MBA Candidate",
          ielts: "7.0 (Simulated)",
          experience: "2",
          preferredCountry: "Canada / UK",
          type: "Live Chat Inquiry",
          score: `User Query: "${inputText.substring(0, 50)}..."`,
          status: "New"
        });
        setLeadLogged(true);
        // Create custom event to notify dashboard of new leads
        window.dispatchEvent(new Event("crm_update"));
      }
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-45">
      {/* Chat Icon Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 bg-brand-blue text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-brand-gold/30 hover:border-brand-gold font-semibold"
        >
          <MessageSquare className="h-5 w-5 text-brand-gold" />
          <span className="text-xs sm:text-sm tracking-wide">Live Support</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[450px] bg-white rounded-2xl shadow-2xl border border-brand-blue-light/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
          {/* Header */}
          <div className="bg-gradient-premium px-4 py-3 text-white flex justify-between items-center border-b border-brand-gold/20">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <div>
                <h4 className="text-sm font-bold tracking-wide">IQ Visa Consultant</h4>
                <p className="text-[10px] text-gray-300">Online | Average reply: 1 min</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm shadow-sm ${
                    msg.sender === "user"
                      ? "bg-brand-blue text-white rounded-tr-none"
                      : "bg-white text-brand-blue-dark border border-brand-blue-light/5 rounded-tl-none"
                  }`}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-brand-blue-light/10 flex space-x-2">
            <input
              type="text"
              placeholder="Ask about Study Visa, Job permit..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-50 border border-brand-blue-light/10 rounded-xl focus:outline-none focus:border-brand-gold text-xs sm:text-sm text-brand-blue-dark placeholder-gray-400"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-gradient-gold text-brand-blue-dark hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
