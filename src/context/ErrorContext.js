import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { createContext, useState, useCallback } from 'react'

export const ErrorContext = createContext(null)

export function ErrorProvider(props) {
  const [errorMsg, setErrorMsg] = useState('')

  const handleClose = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setErrorMsg('')
  }, [])

  const setNewErrorMsg = useCallback(
    (msg) => {
      if (!!errorMsg) {
        return
      }
      setErrorMsg(msg)
    },
    [errorMsg]
  )

  return (
    <ErrorContext.Provider value={{ setNewErrorMsg }}>
      <Snackbar
        open={Boolean(errorMsg)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>
      {props.children}
    </ErrorContext.Provider>
  )
}
