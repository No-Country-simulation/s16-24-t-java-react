import CircularProgress from '@mui/material/CircularProgress'

function LoginSpinner() {
  return (
    <div className='grid place-content-center min-h-dvh text-primary-20 items-center justify-center gap-10 w-full place-items-center bg-gradient-to-br from-primary-70 via-40% via-white to-secondary-70'>
      <h1 className='text-4xl text-primary-40 font-semibold'>Iniciando Sesión...</h1>
      <CircularProgress size={90} color='inherit'/>
    </div>
  )
}

export default LoginSpinner