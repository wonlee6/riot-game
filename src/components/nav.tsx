import '../styles/nav.scss'
import lol_icon2 from '../styles/icon/lol_icon.png'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import EmailAlert from './email-alert'

export default function Nav() {
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div className='nav_container'>
        <div className='title'>
          <img src={lol_icon2} alt='lol' onClick={() => window.location.reload()} />
        </div>
        <ul className='icon_wrap'>
          <li onClick={() => window.location.assign('https://github.com/wonlee6')}>
            gitHub
            <Icon icon='fa:github-square' />
          </li>
          <li onClick={() => window.location.assign('https://www.instagram.com/wonlee6/')}>
            instagram
            <Icon icon='simple-line-icons:social-instagram' />
          </li>
          <li onClick={() => setOpen(true)}>
            email
            <Icon icon='icon-park:accept-email' />
          </li>
        </ul>
      </div>
      <EmailAlert open={open} setOpen={setOpen} />
    </>
  )
}
