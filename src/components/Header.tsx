import React from 'react'

import Logo from '@/assets/logo.png'
import Image from 'next/image'

const Header = () => {
  return (
    <>
        <header  className='h-20 flex items-center'>
          <Image className='w-10 h-10 mr-2'src={Logo} alt='simbiose ventures'/>
          <h1>Gerenciamento de usuários</h1>
        </header>
        <hr />
    </>
  )
}

export default Header