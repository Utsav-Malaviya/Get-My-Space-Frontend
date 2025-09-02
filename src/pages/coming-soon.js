import { useParams, Link } from 'react-router-dom'

const ComingSoon = () => {
  const params = useParams()
  const mallParam = params.mall || ''
  const mallName = mallParam
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')

  return (
    <section
      style={{
        backgroundColor: '#1a1a1a',
        minHeight: '80vh',
        padding: '60px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: '#ffffff', fontSize: '36px', marginBottom: '10px' }}>
          {mallName ? `${mallName} Parking` : 'Parking'}
        </h1>
        <p style={{ color: '#cccccc', fontSize: '18px', marginBottom: '30px' }}>
          We will come soon. Stay tuned!
        </p>
        <Link
          to="/user/mall"
          style={{
            backgroundColor: '#ffd700',
            color: '#000000',
            padding: '12px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Back to Malls
        </Link>
      </div>
    </section>
  )
}

export default ComingSoon


