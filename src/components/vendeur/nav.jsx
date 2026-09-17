"use client"
import { useState, useRef, useEffect } from "react"
import logo from '../../assets/Logo.svg'
import { Bell, LogOut, User, ShoppingCart, Star, AlertTriangle, ShoppingBag, Menu } from "lucide-react"

export default function VendeurNavbar({ onToggleSidebar }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      message: "Nouvelle commande #ORD-2023-0061",
      time: "Il y a 10 minutes",
      read: false,
      link: "signals",
    },
    {
      id: 2,
      type: "review",
      message: "Nouvel avis à modérer",
      time: "Il y a 30 minutes",
      read: false,
      link: "reviews",
    },
    {
      id: 3,
      type: "order",
      message: "Nouvelle commande #ORD-2023-0090",
      time: "Il y a 2 heures",
      read: false,
      link: "vendeurs",
    },
    {
      id: 4,
      type: "order",
      message: "Nouvelle commande #ORD-2023-006",
      time: "Il y a 3 heures",
      read: true,
      link: "mystore",
    },
    {
      id: 5,
      type: "order",
      message: "Nouvelle commande #ORD-2023-0067",
      time: "Il y a 5 heures",
      read: true,
      link: "customers",
    },
  ])

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const notificationsRef = useRef(null)
  const buttonRef = useRef(null)
  const unreadCount = notifications.filter((notif) => !notif.read).length

  // Fermer les notifications quand on clique à l'extérieur
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationsRef.current && 
          !notificationsRef.current.contains(event.target) && 
          !buttonRef.current.contains(event.target)) {
        setIsNotificationsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleNotificationClick = (notification) => {
    setNotifications(notifications.map((notif) => 
      notif.id === notification.id ? { ...notif, read: true } : notif
    ))
    
    if (notification.link && window.setActiveTab) {
      window.setActiveTab(notification.link)
    }
    setIsNotificationsOpen(false)
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const getNotificationIcon = (type) => {
    const icons = {
      signal: <AlertTriangle className="h-4 w-4 text-amber-500" />,
      review: <Star className="h-4 w-4 text-purple-500" />,
      vendor: <ShoppingCart className="h-4 w-4 text-blue-500" />,
      order: <ShoppingBag className="h-4 w-4 text-green-500" />,
      customer: <User className="h-4 w-4 text-orange-500" />
    }
    return icons[type] || <Bell className="h-4 w-4 text-gray-500" />
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar} 
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Toggle sidebar"
        >
          <img src={logo} alt="Logo" className="h-6 w-auto" />
        </button>
        <span className="text-sm font-medium text-gray-600">Vendeur Dashboard</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            ref={buttonRef}
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications dropdown */}
          {isNotificationsOpen && (
            <div 
              ref={notificationsRef}
              className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
            >
              <div className="p-3 border-b flex justify-between border-gray-200 items-center">
                <h3 className="font-semibold text-gray-900 ">Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-xs font-medium text-orange-500 hover:text-orange-600"
                  >
                    Tout marquer comme lu
                  </button>
                )}
              </div>
              
              <div className="max-h-96  overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center border-gray-200text-sm text-gray-500">
                    Aucune notification disponible
                  </div>
                ) : (
                  <div className="divide-y ">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`p-3 border-gray-200 cursor-pointer hover:bg-gray-50 ${
                          notification.read ? "opacity-80" : "bg-gray-50"
                        }`}
                      >
                        <div className="flex gap-3 w-full">
                          <div className="flex-shrink-0 mt-0.5">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="flex-shrink-0">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                Nouveau
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-2 border-t text-center border-gray-200">
                <button 
                  className="text-sm border-gray-200 font-medium text-orange-600 hover:text-orange-700 w-full py-2"
                  onClick={() => setIsNotificationsOpen(false)}
                >
                  Voir toutes les notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User  */}
        <div className="flex items-center gap-2 border-l border-r border-gray-200 px-4 h-full">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold">
            A
          </div>
          <span className="text-sm font-medium text-gray-700">Vendeur Ariel</span>
        </div>

        {/* Logout */}
        <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100">
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">Déconnexion</span>
        </button>
      </div>
    </header>
  )
}
