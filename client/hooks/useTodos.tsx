import { useState, useEffect } from 'react'
import { dbHelpers } from '@/lib/firebase'
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
        const { data, error } = await dbHelpers.todos.getAll(user.uid)
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
    const unsubscribe = dbHelpers.todos.subscribe(user.uid, (updatedTodos) => {
      setTodos(updatedTodos)
    })

    return () => unsubscribe()
  }, [user])

  const createTodo = async (todoData: any) => {
    if (!user) throw new Error('User not authenticated')

    try {
      const { data, error } = await dbHelpers.todos.create({
        ...todoData,
        user_id: user.uid
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
      const { data, error } = await dbHelpers.todos.update(id, updates)
      if (error) throw error
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo')
      throw err
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      const { error } = await dbHelpers.todos.delete(id)
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