'use client'

import { useState, useRef, useEffect } from 'react'
import { PencilIcon, CheckIcon, XIcon, LoaderIcon } from 'lucide-react'
import { toast } from 'sonner'

import { createClient } from '@/utils/supabase/client'
import { useAuthStore } from '@/store/useAuthStore'
import { changeDisplayName } from '@/server/auth/login/actions'

interface ChangeNameProps {
  currentName: string
}

export const ChangeName = ({ currentName }: ChangeNameProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(currentName)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus()
  }, [isEditing])

  const handleSave = async () => {
    if (!editedName.trim() || editedName === currentName) {
      setIsEditing(false)
      return
    }

    setIsUpdating(true)
    setError(null)

    try {
      await changeDisplayName(editedName)

      const supabase = createClient()
      const { data } = await supabase.auth.getUser()

      if (data.user) {
        useAuthStore.getState().setUser({
          id: data.user.id,
          email: data.user.email ?? 'email@example.com',
          name: data.user.user_metadata?.display_name ?? data.user.email ?? 'Usuario',
          role: data.user.user_metadata?.role ?? undefined,
          created_at: data.user.created_at,
          last_sign_in_at: data.user.last_sign_in_at ?? undefined,
        })
      }

      toast.success('Nombre actualizado correctamente')
      setIsEditing(false)
    } catch (err) {
      console.error(err)
      setError('No se pudo actualizar el nombre.')
      toast.error('Error al actualizar el nombre')
    } finally {
      setIsUpdating(false)
    }
  }

  return isEditing ? (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <input
          ref={inputRef}
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave()
            if (e.key === 'Escape') {
              setEditedName(currentName)
              setIsEditing(false)
            }
          }}
          disabled={isUpdating}
          className="w-full px-2 py-1 text-xl font-bold bg-white dark:bg-gray-700 border border-orange-500 dark:border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 text-gray-900 dark:text-white disabled:opacity-70"
          maxLength={25}
        />
        <div className="flex space-x-1">
          {isUpdating ? (
            <LoaderIcon className="h-5 w-5 text-orange-600 dark:text-orange-400 animate-spin" />
          ) : (
            <>
              <button
                onClick={handleSave}
                className="p-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
              >
                <CheckIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  setEditedName(currentName)
                  setIsEditing(false)
                }}
                className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>
      {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  ) : (
    <div className="flex items-center">
      <h2 className="text-xl font-bold truncate text-gray-900 dark:text-white">{currentName}</h2>
      <button
        onClick={() => setIsEditing(true)}
        className="ml-2 p-1 text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
        aria-label="Editar nombre"
      >
        <PencilIcon className="h-4 w-4" />
      </button>
    </div>
  )
}