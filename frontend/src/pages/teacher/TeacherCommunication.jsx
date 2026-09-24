import { useState } from 'react';
import { Search, Send, User, MoreVertical, Phone, Video } from 'lucide-react';

export default function TeacherCommunication() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState('');

  const [contacts] = useState([
    { id: 1, parentName: 'Mrs. Patel', studentName: 'Aarav Patel', rollNo: '101', class: '10-A', lastMessage: 'Thank you for the update.', time: '10:45 AM', unread: 2 },
    { id: 2, parentName: 'Mr. Sharma', studentName: 'Priya Sharma', rollNo: '102', class: '10-A', lastMessage: 'When is the next PTM?', time: 'Yesterday', unread: 0 },
    { id: 3, parentName: 'Mrs. Kumar', studentName: 'Rahul Kumar', rollNo: '103', class: '10-A', lastMessage: 'Rahul will be absent tomorrow.', time: 'Monday', unread: 0 },
  ]);

  const [chatHistories, setChatHistories] = useState({
    1: [
      { sender: 'parent', text: 'Good morning, I wanted to check on Aarav\'s progress in Mathematics.', time: '10:42 AM' },
      { sender: 'teacher', text: 'Good morning! Aarav is doing great. He scored 85% in the recent test.', time: '10:45 AM' },
      { sender: 'parent', text: 'That\'s wonderful to hear. Thank you for the update.', time: '10:45 AM' },
    ],
    2: [
      { sender: 'parent', text: 'When is the next PTM?', time: 'Yesterday' }
    ],
    3: [
      { sender: 'parent', text: 'Rahul will be absent tomorrow due to a doctor\'s appointment.', time: 'Monday' }
    ]
  });

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const newMsg = {
      sender: 'teacher',
      text: message,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistories({
      ...chatHistories,
      [activeChat]: [...(chatHistories[activeChat] || []), newMsg]
    });
    
    setMessage('');
  };

  const filteredContacts = contacts.filter(c => 
    c.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.rollNo.includes(searchQuery) ||
    c.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeContact = contacts.find(c => c.id === activeChat);
  const currentChat = chatHistories[activeChat] || [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[calc(100vh-10rem)] flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Parent Communication</h1>
        <p className="text-sm text-gray-500 mt-1">Search for students and communicate directly with parents.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-gray-100 flex flex-col bg-gray-50/30">
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, ID, class, roll no..." 
                className="w-full pl-9 pr-4 py-2 bg-gray-100 border-transparent rounded-xl text-sm focus:border-indigo-500 focus:bg-white focus:ring-0 transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">No parents or students found.</div>
            ) : (
              filteredContacts.map((contact) => (
                <div 
                  key={contact.id} 
                  onClick={() => setActiveChat(contact.id)}
                  className={`p-4 border-b border-gray-50 cursor-pointer transition-colors ${activeChat === contact.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : 'hover:bg-gray-50 border-l-4 border-l-transparent'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold text-gray-900">{contact.parentName}</h4>
                    <span className="text-xs text-gray-500 font-medium">{contact.time}</span>
                  </div>
                  <p className="text-xs text-indigo-600 font-medium mb-1">Parent of {contact.studentName} (Roll: {contact.rollNo})</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500 truncate pr-4">{contact.lastMessage}</p>
                    {contact.unread > 0 && activeChat !== contact.id && (
                      <span className="flex items-center justify-center h-5 w-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold shrink-0">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        {activeContact ? (
          <div className="flex-1 flex flex-col bg-white">
            <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-white z-10">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <User className="h-5 w-5 text-indigo-700" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{activeContact.parentName}</h3>
                  <p className="text-xs text-gray-500 font-medium">Student: {activeContact.studentName} • Class {activeContact.class}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors"><Phone className="h-5 w-5" /></button>
                <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors"><Video className="h-5 w-5" /></button>
                <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors"><MoreVertical className="h-5 w-5" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 space-y-4">
              <div className="flex justify-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full">Conversation Started</span>
              </div>
              {currentChat.map((msg, index) => (
                <div key={index} className={`flex items-start max-w-[80%] ${msg.sender === 'teacher' ? 'ml-auto justify-end' : ''}`}>
                  <div className={`p-3 rounded-2xl shadow-sm ${msg.sender === 'teacher' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm'}`}>
                    <p className="text-sm">{msg.text}</p>
                    <span className={`text-[10px] mt-1 block ${msg.sender === 'teacher' ? 'text-indigo-200 text-right' : 'text-gray-400'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
              <form onSubmit={handleSend} className="flex items-center space-x-3">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..." 
                  className="flex-1 bg-gray-50 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all"
                />
                <button type="submit" disabled={!message.trim()} className="h-11 w-11 bg-indigo-600 disabled:bg-indigo-400 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center transition-colors shadow-sm shrink-0">
                  <Send className="h-5 w-5 ml-1" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50/50">
            <p className="text-gray-500 font-medium">Select a parent from the list to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
}
