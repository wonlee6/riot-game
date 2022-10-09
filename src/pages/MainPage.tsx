import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import ReactiveButton from 'reactive-button'
import { useNavigate } from 'react-router'
import Nav from '../components/Nav'
import '../styles/main_page.scss'

export type BtnModel = 'idle' | 'loading' | 'success' | 'error'

const MainPage = () => {
  const navigate = useNavigate()
  const [btn_state, setBtnState] = useState<BtnModel>('idle')
  const btn_ref: React.MutableRefObject<null | HTMLButtonElement> = useRef(null)

  const [searchName, setSearchName] = useState<string>('')

  /**
   *  function
   */
  const handleSearchName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value)
  }, [])

  const handleEnther = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') searchSummoner()
    },
    [searchName]
  )

  /**
   *  API Request
   */
  // 서머너 검색
  const searchSummoner = useCallback(() => {
    if (!searchName) return
    setBtnState('loading')

    localStorage.setItem('name', JSON.stringify(searchName))

    setTimeout(() => {
      navigate('/match', { state: searchName })
    }, 1000)
  }, [searchName])

  useEffect(() => {
    const lastSearchName = localStorage.getItem('name')
    if (lastSearchName) {
      setSearchName(lastSearchName.replace(/"/g, '').trim())
    }
  }, [])

  return (
    <>
      <Nav />
      <div className='container'>
        <div className='search_box'>
          <input
            type='text'
            className='search_input'
            id='search_name'
            value={searchName}
            onChange={handleSearchName}
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
            onClick={searchSummoner}
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
