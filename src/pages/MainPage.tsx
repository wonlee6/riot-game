import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import '../styles/main_page.scss'
import ReactiveButton from 'reactive-button'
import { useNavigate } from 'react-router'
import Nav from '../components/Nav'

export type BtnModel = 'idle' | 'loading' | 'success' | 'error'

const MainPage = () => {
  const navigate = useNavigate()
  const [btn_state, setBtnState] = useState<BtnModel>('idle')
  const btn_ref: React.MutableRefObject<null | HTMLButtonElement> = useRef(null)

  const [search_name, setSearchName] = useState<string>('')
  const [isSearch, setIsSearch] = useState<boolean>(false)

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
    [search_name]
  )

  /**
   *  API Request
   */
  // 서머너 검색
  const searchSummoner = useCallback(() => {
    if (!search_name) return
    setBtnState('loading')

    localStorage.setItem('name', JSON.stringify(search_name))

    setTimeout(() => {
      navigate('/match', { state: search_name })
    }, 1000)
  }, [search_name])

  useEffect(() => {
    const lastSearchName = localStorage.getItem('name')
    if (lastSearchName) {
      setSearchName(lastSearchName.replace(/\"/g, '').trim())
    }
  }, [])

  return (
    <>
      <Nav searchName={search_name} is_search={isSearch} />
      <div className='container'>
        <div className='search_box'>
          <input
            type='text'
            className='search_input'
            id='search_name'
            value={search_name}
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
