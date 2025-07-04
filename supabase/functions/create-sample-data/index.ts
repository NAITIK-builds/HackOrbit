import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'supabase'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { userId } = await req.json()

    if (!userId) {
      throw new Error('User ID is required')
    }

    // Create sample todos for the user
    const { error: todosError } = await supabase
      .from('todos')
      .insert([
        {
          user_id: userId,
          title: 'Complete React Workshop Assignment',
          description: 'Build a todo app using React hooks and context',
          priority: 'high',
          due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          user_id: userId,
          title: 'Prepare for Hackathon',
          description: 'Research problem statements and form a team',
          priority: 'medium',
          due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          user_id: userId,
          title: 'Update GitHub Profile',
          description: 'Add recent projects and improve README files',
          priority: 'low',
          completed: false
        }
      ])

    if (todosError) throw todosError

    // Create sample projects for the user
    const { error: projectsError } = await supabase
      .from('projects')
      .insert([
        {
          user_id: userId,
          title: 'Personal Portfolio Website',
          description: 'A responsive portfolio website built with React and Tailwind CSS',
          tech_stack: ['React', 'Tailwind CSS', 'Vite', 'Vercel'],
          status: 'Completed',
          github_url: 'https://github.com/username/portfolio',
          demo_url: 'https://portfolio.example.com'
        },
        {
          user_id: userId,
          title: 'Task Management App',
          description: 'A collaborative task management application with real-time updates',
          tech_stack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
          status: 'In Progress',
          github_url: 'https://github.com/username/task-manager'
        }
      ])

    if (projectsError) throw projectsError

    // Create sample achievements for the user
    const { error: achievementsError } = await supabase
      .from('achievements')
      .insert([
        {
          user_id: userId,
          title: 'Welcome to HackOrbit!',
          description: 'Successfully joined the HackOrbit community',
          icon: '🎉'
        },
        {
          user_id: userId,
          title: 'First Project',
          description: 'Created your first project',
          icon: '🚀'
        }
      ])

    if (achievementsError) throw achievementsError

    return new Response(
      JSON.stringify({ message: 'Sample data created successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})