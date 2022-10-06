import '../../styles/loadingSpinner.scss'

export default function LoadingSpinner() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className='loading'></div>
    </div>
  )
}
