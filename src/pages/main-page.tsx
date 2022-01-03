import React, { useEffect, useRef, useState } from 'react'
import '../styles/main_page.scss'
import ReactiveButton from 'reactive-button'
import Nav from '../components/nav'
import { useNavigate } from 'react-router'

const MainPage = () => {
  const navigate = useNavigate()
  const [btn_state, setBtnState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const btn_ref: React.MutableRefObject<null | HTMLButtonElement> = useRef(null)

  const [search_name, setSearchName] = useState<string>('')
  const [is_search, setIsSearch] = useState<boolean>(false)

  /**
   *  function
   */
  const handleEnther = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') searchSummoner(search_name)
  }

  /**
   *  API Request
   */
  // 서머너 검색
  const searchSummoner = (name: string) => {
    if (search_name === '') return
    setBtnState('loading')

    setTimeout(() => {
      navigate('/match', { state: name })
    }, 1000)
  }

  return (
    <>
      <Nav searchName={search_name} is_search={is_search} />
      <div className='container'>
        <div className='search_box'>
          <input
            type='text'
            className='search_input'
            id='search_name'
            value={search_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value)}
            autoComplete='off'
            placeholder='닉네임을 입력하세요'
            onKeyPress={handleEnther}
          />
          <ReactiveButton
            animation={true}
            height={'100%'}
            buttonState={btn_state}
            buttonRef={btn_ref}
            width={'20%'}
            onClick={() => searchSummoner(search_name)}
            idleText='검색하기'
            successText='성공!'
            color='blue'
          />
        </div>
      </div>
    </>
  )
}

export default MainPage
