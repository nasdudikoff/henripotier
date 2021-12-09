import '../styles/globals.scss'
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app'
import { store } from '../redux/store';
import Header from '../components/Header';
function MyApp({ Component, pageProps }: AppProps) {
  return (<Provider store={store}>
    <Header />
    <Component {...pageProps} />
  </Provider>)
}

export default MyApp
