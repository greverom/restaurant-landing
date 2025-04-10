'use client'

import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { ChangeName } from '../profile/changeName'
import ChangePassword from '../profile/changePassword'

export interface User {
  name: string
  email: string
  role?: string
  created_at?: string
  last_sign_in_at?: string
}

interface UserProfileCardProps {
  user: User
}

export default function UserProfileCard({ user }: UserProfileCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No disponible'
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }

  const timeAgo = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return formatDistanceToNow(date, { addSuffix: true, locale: es })
  }

  const translateRole = (role: string) => {
    const roles: Record<string, string> = {
      admin: 'Administrador',
      administrator: 'Administrador',
      waiter: 'Mesero',
      cook: 'Cocinero',
      chef: 'Chef',
      user: 'Usuario',
    }
    return roles[role.toLowerCase()] || role
  }
  

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="relative">
        {/* Banner decorativo */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-orange-500 to-orange-400 opacity-80"></div>
  
        <div className="relative pt-16 px-6 pb-6">
          <div className="flex flex-col items-center">
            {/* Avatar con iniciales */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-600 to-gray-400 flex items-center justify-center text-white text-2xl font-bold border-4 border-white dark:border-gray-800 shadow-md transform hover:scale-105 transition-transform duration-300">
              {getInitials(user.name)}
            </div>
  
            {/* Nombre y correo */}
            <div className="mt-4 text-left w-full">
              <ChangeName currentName={user.name} />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
            </div>
          </div>
  
          {/* Información del usuario */}
          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/70 transition-colors">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Rol</div>
                <div className="mt-1 text-gray-900 dark:text-white font-medium">
                  {translateRole(user.role || '').charAt(0).toUpperCase() +
                    translateRole(user.role || '').slice(1).toLowerCase()}
                </div>
              </div>
  
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/70 transition-colors">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Cuenta creada</div>
                <div className="mt-1 text-gray-900 dark:text-white font-medium">{formatDate(user.created_at || '')}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(user.created_at || '')}</div>
              </div>
  
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/70 transition-colors">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Último inicio de sesión</div>
                <div className="mt-1 text-gray-900 dark:text-white font-medium">
                  {formatDate(user.last_sign_in_at || '')}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(user.last_sign_in_at || '')}</div>
              </div>
            </div>
          </div>
  
          <div className="mt-5">
            <ChangePassword />
          </div>
        </div>
      </div>
    </div>
  )
}