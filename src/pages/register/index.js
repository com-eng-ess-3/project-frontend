import React from 'react'
import { AuthComponent } from 'components'

function RegisterPage({ urlRedirect }) {
  return <AuthComponent isRegister urlRedirect={urlRedirect} />
}

export default RegisterPage
