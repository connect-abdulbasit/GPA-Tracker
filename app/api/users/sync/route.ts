import { NextResponse } from 'next/server'
import { DatabaseManager } from '@/lib/database'
import { auth } from '@clerk/nextjs/server'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const result = await DatabaseManager.createUser(body.user)
    
    return NextResponse.json({ success: true, user: result })
  } catch (error) {
    console.error('Error syncing user:', error)
    return NextResponse.json(
      { error: 'Failed to sync user' }, 
      { status: 500 }
    )
  }
} 