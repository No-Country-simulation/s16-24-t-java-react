import CircularProgress from '@mui/material/CircularProgress'

function AppSkeleton() {
  return (
    <div className='grid place-content-center min-h-dvh items-center justify-center gap-10 w-full place-items-center'>
      <h1 className='text-4xl'>Cargando...</h1>
      <CircularProgress size={90}/>
    </div>
  )
}

export default AppSkeleton