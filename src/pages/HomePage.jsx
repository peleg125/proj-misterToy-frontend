import toystorelogo from '../assets/img/toystorelogo.png'

export function HomePage() {
  return (
    <section className='home-page'>
      <section className='container'>
        <section className='inner-container'>
          <div>Welcome to the toy store that has all your toy needs.</div>
          <img src={toystorelogo} alt='Toy Store' />
        </section>
      </section>
    </section>
  )
}
