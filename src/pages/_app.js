import Container from '@/components/Container/Container';

import '@/styles/Reset.scss';
import '@/styles/Globals.scss';
import '@/styles/IntersectionObserver.scss';

export default function App({ Component, pageProps }) {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  )
}
