export const telFormat = (e: string) => {
  if (typeof e !== 'string') return ''

  if (e.length >= 1) {
    if (e[0] !== '0') {
      return ''
    }
  }

  if (e.length >= 2) {
    if (e[1] === '2') {
      const numOnly = e.replace(/[^0-9]/gi, '').substr(0, 10)

      if (numOnly.length < 9) {
        return numOnly.replace(/^(\d{2})(\d{1,6})$/, `$1-$2`)
      } else if (numOnly.length === 9) {
        return numOnly.replace(/^(\d{2})(\d{3})(\d{4})$/, `$1-$2-$3`)
      } else {
        return numOnly.replace(/^(\d{2})(\d{4})(\d{4})$/, `$1-$2-$3`)
      }
    } else {
      const numOnly = e.replace(/[^0-9]/gi, '').substr(0, 11)

      if (numOnly.length < 10) {
        return numOnly.replace(/^(\d{3})(\d{1,10})$/, `$1-$2`)
      } else if (numOnly.length === 10) {
        return numOnly.replace(/^(\d{3})(\d{3})(\d{4})$/, `$1-$2-$3`)
      } else {
        return numOnly.replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`)
      }
    }
  }

  return e.replace(/[^0-9]/gi, '')
}

export const emailRegex = (e: string) => {
  return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(e)
}

// 1의 자리 수 2의 자리 수로 포맷
export const numberFormat = (e: number): string => {
  return e < 10 ? `0${e}` : `${e}`
}

// second -> 분:초
export const second2MS = (e: number): string => {
  const minute = Math.floor(e / 60)
  return `${minute}분${numberFormat(e - minute * 60)}초`
}

// moment
// 2 days ago => 2일 전
export const fromNowDate = (e: string) => {
  const date = e.split(' ')
  if (date[1] === 'days') {
    return `${date[0]}일 전`
  } else if (date[1] === 'day') {
    return `1일 전`
  } else if (date[1] === 'months') {
    return `${date[0]}달 전`
  } else {
    return `${date[0]}시간 전`
  }
}
