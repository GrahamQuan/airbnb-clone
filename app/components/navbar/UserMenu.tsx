'use client'

import { useCallback, useState } from 'react'
import type { FC } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import { useAppDispatch } from '@/app/redux/hooks'
import { onRegisterOpen } from '@/app/redux/features/registerSlice'
import { onLoginOpen } from '@/app/redux/features/loginSlice'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'
import { onRentOpen } from '@/app/redux/features/rentSlice'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type Props = {
  user: SafeUser | null
}

const UserMenu: FC<Props> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  const onLogin = useCallback(() => {
    dispatch(onLoginOpen())
    setIsOpen(false)
  }, [dispatch])

  const onSignup = useCallback(() => {
    dispatch(onRegisterOpen())
    setIsOpen(false)
  }, [dispatch])

  const onRent = useCallback(() => {
    if (!user) {
      toast.error('Please Login First')
      dispatch(onLoginOpen())
      return
    }
    dispatch(onRentOpen())
  }, [dispatch, user])

  const onNavigateClick = useCallback(
    (path: string) => {
      router.push(path)
      setIsOpen(false)
    },
    [router]
  )

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px] 
            border-neutral-200 
            flex 
            flex-row 
            items-center 
            gap-3 
            rounded-full 
            cursor-pointer 
            hover:shadow-md 
            transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={user?.image} name={user?.name} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
          absolute 
          rounded-xl 
          shadow-md
          w-[40vw]
          md:w-3/4 
          bg-white 
          overflow-hidden 
          right-0 
          top-12 
          text-sm
        "
        >
          <div className="flex flex-col cursor-pointer">
            {user ? (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() => onNavigateClick('/trips')}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => onNavigateClick('/favorites')}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => onNavigateClick('/reservations')}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => onNavigateClick('/properties')}
                />
                <MenuItem label="Airbnb your home" onClick={() => {}} />
                <hr />
                <MenuItem
                  label="Logout"
                  onClick={() => signOut({ callbackUrl: '/' })}
                />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={onLogin} />
                <MenuItem label="Sign up" onClick={onSignup} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
