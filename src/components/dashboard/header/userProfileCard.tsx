'use client'

import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { ChangeName } from '../profile/changeName'


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
    <div className="w-full max-w-md mx-auto bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden transition-all">
      <div className="px-0">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-18 h-18 rounded-full bg-orange-400 dark:bg-orange-400 flex items-center justify-center text-white text-xl font-bold">
              {getInitials(user.name)}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <ChangeName currentName={user.name} />
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-200 dark:bg-gray-700/50 p-3 rounded-lg">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Rol</div>
              <div className="mt-1 text-gray-900 dark:text-white font-medium">
                {translateRole(user.role || '').charAt(0).toUpperCase() +
                  translateRole(user.role || '').slice(1).toLowerCase()}
              </div>
            </div>

            <div className="bg-gray-200 dark:bg-gray-700/50 p-3 rounded-lg">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Cuenta creada</div>
              <div className="mt-1 text-gray-900 dark:text-white font-medium">{formatDate(user.created_at || '')}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(user.created_at || '')}</div>
            </div>

            <div className="bg-gray-200 dark:bg-gray-700/50 p-3 rounded-lg">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Último inicio de sesión</div>
              <div className="mt-1 text-gray-900 dark:text-white font-medium">
                {formatDate(user.last_sign_in_at || '')}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(user.last_sign_in_at || '')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}