import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import EditModalContextProvider from './context/EditModalContext'
import ThemeContextProvider from './context/ThemeContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <EditModalContextProvider>
          <App />
        </EditModalContextProvider>
      </ThemeContextProvider>
    </Provider>
  </React.StrictMode>,
)
