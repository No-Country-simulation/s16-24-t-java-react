import CircularProgress from '@mui/material/CircularProgress'

function LoadingSpinner({ size, text, classNameText, classNameContainer }) {
  return (
    <div className={`${classNameContainer || 'grid place-content-center min-h-dvh text-primary-20 items-center justify-center gap-10 w-full place-items-center bg-gradient-to-br from-primary-70 via-40% via-white to-secondary-70'}`}>
      <h1 className={`${classNameText || `text-4xl text-primary-40 font-semibold`}`}>{text}</h1>
      <CircularProgress size={size} color='inherit' />
    </div>
  )
}

export default LoadingSpinner