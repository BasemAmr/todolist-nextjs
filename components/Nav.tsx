import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import { ModeToggle } from './ToggleTheme'

const Nav = () => {
  return (
    <div className="flex items-center justify-around container p-5 ">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <ModeToggle />
        <SignedIn>
            <UserButton />    
        </SignedIn>   
        <SignedOut>
            <SignInButton />
        </SignedOut>
    </div>
  )
}

export default Nav