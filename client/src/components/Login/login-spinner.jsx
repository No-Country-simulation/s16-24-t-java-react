import CircularProgress from '@mui/material/CircularProgress'

function LoginSpinner() {
  return (
    <div className='grid place-content-center min-h-dvh text-primary-20 items-center justify-center gap-10 w-full place-items-center'>
      <h1 className='text-4xl text-black '>Iniciando Sesión...</h1>
      <CircularProgress size={90} color='inherit'/>
    </div>
  )
}

export default LoginSpinner