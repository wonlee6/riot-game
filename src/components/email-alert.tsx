import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { SetStateAction, useEffect, useState } from 'react'
import { send, init } from 'emailjs-com'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import { emailRegex, telFormat } from '../function/function'

type EmailAlertModel = {
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
}

export default function EmailAlert({ open, setOpen }: EmailAlertModel) {
  // validation state
  const [is_name, setIsName] = useState<boolean>(false)
  const [is_phone, setIsPhone] = useState<boolean>(false)
  const [is_email, setIsEmail] = useState<boolean>(false)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const handleClose = () => {
    setOpen(false)
  }

  const handleValidation = () => {
    const ok = true
    if (form.name === '') {
      setIsName(true)
      return !ok
    } else if (form.phone === '') {
      setIsPhone(true)
      return !ok
    } else if (!emailRegex(form.email)) {
      setIsEmail(true)
      return !ok
    }
    return ok
  }

  const handleSubmit = () => {
    const ok = handleValidation()
    if (ok) {
      send('service_ra99gvp', 'template_vvocte6', {
        name: form.name,
        phone: form.phone,
        message: form.message,
        email: form.email,
      })

      alert('메일 감사합니다.')
      setOpen(false)
    }
  }
  useEffect(() => {
    init('user_hTdjjyUW94K3ELQFsPedM')
  }, [])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>저에게 email 보내주세요</DialogTitle>
        <DialogContent style={{ width: '500px', padding: '10px' }}>
          <TextField
            error={is_name}
            id='outlined-basic'
            label='name'
            variant='outlined'
            style={{ width: '100%', marginBottom: '10px' }}
            helperText={is_name === true ? '이름을 적어주세요' : ''}
            value={form.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, name: e.target.value })
            }
            onBlur={() => (form.name === '' ? setIsName(true) : setIsName(false))}
          />
          <TextField
            error={is_phone}
            id='outlined-basic'
            label='phone'
            variant='outlined'
            style={{ width: '100%', marginBottom: '10px' }}
            helperText={is_phone === true ? '핸드폰을 적어주세요' : ''}
            value={form.phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, phone: telFormat(e.target.value) })
            }
            onBlur={() => (form.phone === '' ? setIsPhone(true) : setIsPhone(false))}
          />
          <TextField
            error={is_email}
            id='outlined-basic'
            label='email'
            variant='outlined'
            style={{ width: '100%', marginBottom: '10px' }}
            helperText={is_email === true ? '이메일을 적어주세요' : ''}
            value={form.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, email: e.target.value })
            }
            onBlur={() => (form.email === '' ? setIsEmail(true) : setIsEmail(false))}
          />
          <TextareaAutosize
            aria-label='message'
            minRows={3}
            placeholder='내용을 입력해주세요'
            style={{ width: '100%' }}
            value={form.message}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setForm({ ...form, message: e.target.value })
            }
            maxLength={200}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleSubmit} autoFocus>
            전송
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
