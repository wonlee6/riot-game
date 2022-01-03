import '../styles/nav.scss'
import lol_icon2 from '../styles/icon/lol_icon.png'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import EmailAlert from './email-alert'
import { useNavigate } from 'react-router'

interface NavModel {
  searchName?: string
  is_search?: boolean
}

export default function Nav({ searchName, is_search }: NavModel) {
  const [open, setOpen] = useState<boolean>(false)

  const navigate = useNavigate()

  const [recentNames, setRecentNames] = useState([] as string[])

  const handlePage = () => {
    navigate('/', { replace: true })
  }

  // const lastSearchedNames = (e: string) => {
  //   console.log(e)
  //   setRecentNames(recentNames.includes(e) ? [...recentNames] : recentNames.concat(e))
  //   localStorage.setItem('name', JSON.stringify(recentNames))
  // }

  // useEffect(() => {
  //   if (is_search === true && searchName !== undefined) {
  //     lastSearchedNames(searchName)
  //   }
  // }, [is_search])

  return (
    <>
      <div className='nav_container'>
        <div className='title'>
          <img src={lol_icon2} alt='lol' onClick={handlePage} />
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
