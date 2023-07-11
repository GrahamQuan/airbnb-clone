import type { FC, ReactNode } from 'react'
import Logo from './Logo'
import Container from '../Container'
import Search from './Search'
import UserMenu from './UserMenu'
import { SafeUser } from '@/app/types'

type Props = {
  user: SafeUser | null
}

const Navbar: FC<Props> = ({ user }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <Container>
        <div
          className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
        >
          <Logo />
          <Search />
          <UserMenu user={user} />
        </div>
      </Container>
    </div>
  )
}

export default Navbar
