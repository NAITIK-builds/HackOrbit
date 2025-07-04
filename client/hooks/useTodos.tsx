import { useState, useEffect } from 'react'
import { db, realtime } from '@/lib/supabase'
import { useAuth } from './useAuth'

export function useTodos() {
  const { user } = useAuth()
  const [todos, setTodos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setTodos([])
      setLoading(false)
      return
    }

    // Fetch initial todos
    const fetchTodos = async () => {
      try {
        const { data, error } = await db.todos.getAll(user.id)
        if (error) throw error
        setTodos(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchTodos()

    // Subscribe to real-time updates
    const subscription = realtime.subscribeTodos(user.id, (payload) => {
      const { eventType, new: newRecord, old: oldRecord } = payload

      setTodos(current => {
        switch (eventType) {
          case 'INSERT':
            return [...current, newRecord]
          case 'UPDATE':
            return current.map(todo => 
              todo.id === newRecord.id ? newRecord : todo
            )
          case 'DELETE':
            return current.filter(todo => todo.id !== oldRecord.id)
          default:
            return current
        }
      })
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  const createTodo = async (todoData: any) => {
    if (!user) throw new Error('User not authenticated')

    try {
      const { data, error } = await db.todos.create({
        ...todoData,
        user_id: user.id
      })
      if (error) throw error
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo')
      throw err
    }
  }

  const updateTodo = async (id: string, updates: any) => {
    try {
      const { data, error } = await db.todos.update(id, updates)
      if (error) throw error
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo')
      throw err
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      const { error } = await db.todos.delete(id)
      if (error) throw error
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo')
      throw err
    }
  }

  return {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo
  }
}