// import { NextResponse } from 'next/server'
// import { DatabaseManager } from '@/lib/database'
// import { authClient } from '@/lib/auth-client'

// export async function POST(request: Request) {
//   try {
//     const { data: { user } } = await authClient.getSession()
    
//     if (!user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const body = await request.json()
//     const result = await DatabaseManager.updateUser(user.id,body.user)
    
//     return NextResponse.json({ success: true, user: result })
//   } catch (error) {
//     console.error('Error syncing user:', error)
//     return NextResponse.json(
//       { error: 'Failed to sync user' }, 
//       { status: 500 }
//     )
//   }
// } 