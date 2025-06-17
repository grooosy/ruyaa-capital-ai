"use client";

import React, { useState } from 'react';
import { Bell, X, Check, AlertCircle, TrendingUp, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'ai';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'ai',
    title: 'AI Signal Generated',
    message: 'New high-probability trading signal detected for EURUSD',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
  },
  {
    id: '2',
    type: 'success',
    title: 'Trade Executed',
    message: 'Your XAUUSD position closed with +2.5% profit',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Market Update',
    message: 'Weekly market analysis available in Academy',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: '4',
    type: 'warning',
    title: 'Risk Alert',
    message: 'High volatility detected in crypto markets',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: true,
  },
];

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <Check className="w-4 h-4 text-green" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'ai': return <Bot className="w-4 h-4 text-primary" />;
      default: return <TrendingUp className="w-4 h-4 text-blue-400" />;
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-12 w-80 bg-black/90 backdrop-blur-xl border border-primary/20 rounded-lg shadow-2xl shadow-primary/10 z-50"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <h3 className="text-white font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-secondary text-black text-xs font-bold px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-gray-400 hover:text-primary transition-colors"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/5 rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-4 border-b border-white/5 last:border-b-0 cursor-pointer transition-colors hover:bg-white/5 ${
                    !notification.read ? 'bg-primary/5' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-medium ${
                          !notification.read ? 'text-white' : 'text-gray-300'
                        }`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getTimeAgo(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-white/10">
            <button className="w-full text-center text-xs text-gray-400 hover:text-primary transition-colors">
              View all notifications
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationDropdown;