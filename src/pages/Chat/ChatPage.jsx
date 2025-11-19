import { useState, useEffect, useRef } from 'react';
import { Search, Phone, Video, MoreVertical, Send, Paperclip, Smile, Check, CheckCheck, Circle, ArrowLeft, User } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';

const ChatPage = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);
  const [showMobileChat, setShowMobileChat] = useState(false);

  useEffect(() => {
    // Mock conversations data
    const mockConversations = [
      {
        id: '1',
        name: 'LegalTech Corp',
        avatar: '⚖️',
        lastMessage: 'Thank you for your interest in our Legal Document Analyzer!',
        timestamp: '2 min ago',
        unread: 2,
        online: true,
        agentName: 'Legal Document Analyzer',
        context: 'AgentX Hub Inquiry'
      },
      {
        id: '2',
        name: 'SalesPro Inc',
        avatar: '📈',
        lastMessage: 'The Sales Forecasting AI can definitely help with your pipeline analysis.',
        timestamp: '15 min ago',
        unread: 0,
        online: true,
        agentName: 'Sales Forecasting AI',
        context: 'Pre-deployment Discussion'
      },
      {
        id: '3',
        name: 'TalentHub Solutions',
        avatar: '👥',
        lastMessage: 'We offer custom integration with your existing ATS system.',
        timestamp: '1 hour ago',
        unread: 1,
        online: false,
        agentName: 'HR Recruitment Assistant',
        context: 'Integration Query'
      },
      {
        id: '4',
        name: 'Aasim AI Support',
        avatar: '🤖',
        lastMessage: 'Your deployment has been completed successfully!',
        timestamp: '3 hours ago',
        unread: 0,
        online: true,
        agentName: 'Customer Support Pro',
        context: 'Support Ticket #1234'
      },
      {
        id: '5',
        name: 'MarketPro Analytics',
        avatar: '📊',
        lastMessage: 'The free trial includes all premium features for 14 days.',
        timestamp: 'Yesterday',
        unread: 0,
        online: false,
        agentName: 'Marketing Analytics Engine',
        context: 'Trial Information'
      },
      {
        id: '6',
        name: 'HealthTech Systems',
        avatar: '🏥',
        lastMessage: 'HIPAA compliance is built into every aspect of our agent.',
        timestamp: '2 days ago',
        unread: 0,
        online: false,
        agentName: 'Healthcare Claims Processor',
        context: 'Compliance Discussion'
      }
    ];

    setConversations(mockConversations);
    setSelectedConversation(mockConversations[0]);
  }, []);

  useEffect(() => {
    // Mock messages for selected conversation
    if (selectedConversation) {
      const mockMessages = [
        {
          id: '1',
          senderId: selectedConversation.id,
          senderName: selectedConversation.name,
          content: 'Hi! I saw you were interested in our ' + selectedConversation.agentName + '. How can I help you today?',
          timestamp: '10:30 AM',
          status: 'read',
          isOwn: false
        },
        {
          id: '2',
          senderId: 'me',
          senderName: 'You',
          content: 'Yes, I\'m interested in learning more about the features and pricing.',
          timestamp: '10:32 AM',
          status: 'read',
          isOwn: true
        },
        {
          id: '3',
          senderId: selectedConversation.id,
          senderName: selectedConversation.name,
          content: 'Great! Our ' + selectedConversation.agentName + ' offers comprehensive features including automated processing, real-time analytics, and seamless integration with your existing systems.',
          timestamp: '10:33 AM',
          status: 'read',
          isOwn: false
        },
        {
          id: '4',
          senderId: 'me',
          senderName: 'You',
          content: 'That sounds perfect for our needs. Can you tell me more about the integration process?',
          timestamp: '10:35 AM',
          status: 'read',
          isOwn: true
        },
        {
          id: '5',
          senderId: selectedConversation.id,
          senderName: selectedConversation.name,
          content: selectedConversation.lastMessage,
          timestamp: '10:37 AM',
          status: 'delivered',
          isOwn: false
        }
      ];

      setMessages(mockMessages);
    }
  }, [selectedConversation]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        senderId: 'me',
        senderName: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
        isOwn: true
      };

      setMessages([...messages, message]);
      setNewMessage('');

      // Update conversation last message
      setConversations(conversations.map(conv =>
        conv.id === selectedConversation.id
          ? { ...conv, lastMessage: newMessage, timestamp: 'Just now' }
          : conv
      ));
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.agentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMessageStatus = (status) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-primary-600" />;
      default:
        return null;
    }
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Conversations List */}
        <div className={`w-full md:w-96 border-r border-gray-200 bg-white flex flex-col ${
          showMobileChat ? 'hidden md:flex' : 'flex'
        }`}>
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-secondary-900 mb-4 tracking-tight">Messages</h1>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => {
                  setSelectedConversation(conv);
                  setShowMobileChat(true);
                  // Mark as read
                  setConversations(conversations.map(c =>
                    c.id === conv.id ? { ...c, unread: 0 } : c
                  ));
                }}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation?.id === conv.id ? 'bg-primary-50 border-l-4 border-l-primary-600' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-xl">
                      {conv.avatar}
                    </div>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-bold text-secondary-900 truncate">{conv.name}</h3>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{conv.timestamp}</span>
                    </div>
                    <div className="text-xs text-primary-600 font-medium mb-1 truncate">{conv.agentName}</div>
                    <p className="text-sm text-secondary-600 truncate">{conv.lastMessage}</p>
                    <div className="text-xs text-gray-500 mt-1">{conv.context}</div>
                  </div>

                  {/* Unread Badge */}
                  {conv.unread > 0 && (
                    <div className="flex-shrink-0 w-5 h-5 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {conv.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className={`flex-1 flex flex-col bg-gray-50 ${
            showMobileChat ? 'flex' : 'hidden md:flex'
          }`}>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowMobileChat(false)}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ArrowLeft className="w-5 h-5 text-secondary-600" />
                  </button>

                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-xl">
                      {selectedConversation.avatar}
                    </div>
                    {selectedConversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-secondary-900">{selectedConversation.name}</h2>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-primary-600 font-medium">{selectedConversation.agentName}</p>
                      {selectedConversation.online && (
                        <>
                          <Circle className="w-1 h-1 fill-gray-400 text-gray-400" />
                          <p className="text-xs text-green-600 font-medium">Online</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Phone className="w-5 h-5 text-secondary-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Video className="w-5 h-5 text-secondary-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-secondary-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex items-end gap-2 ${message.isOwn ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  {!message.isOwn && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-sm flex-shrink-0">
                      {selectedConversation.avatar}
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div className={`max-w-md ${message.isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.isOwn
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white'
                          : 'bg-white text-secondary-900 border border-gray-200'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    <div className={`flex items-center gap-1 mt-1 px-2 ${message.isOwn ? 'flex-row-reverse' : ''}`}>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                      {message.isOwn && renderMessageStatus(message.status)}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Paperclip className="w-5 h-5 text-secondary-600" />
                </button>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-12"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Smile className="w-5 h-5 text-secondary-600" />
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex-1 hidden md:flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">No Conversation Selected</h3>
              <p className="text-secondary-600">Select a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ChatPage;
