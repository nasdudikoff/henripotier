import '../styles/globals.scss'
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app'
import { store } from '../redux/store';
import Main from '../components/Main';

function MyApp({ Component, pageProps }: AppProps) {
  return (<Provider store={store}>
    <Main>
      <Component {...pageProps} />
    </Main>
  </Provider>)
}

export default MyApp
