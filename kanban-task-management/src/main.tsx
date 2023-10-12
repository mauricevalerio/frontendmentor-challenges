import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import EditModalContextProvider from './context/EditModalContext'
import ThemeContextProvider from './context/ThemeContext'
import DrawerTogglerContextProvider from './context/DrawerTogglerContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const saveState = (state: any) => {
  try {
    const serialBoards = JSON.stringify(state.boards)
    const serialCurrentBoard = JSON.stringify(state.currentBoard)
    localStorage.setItem('boards', serialBoards)
    localStorage.setItem('currentBoard', serialCurrentBoard)
  } catch (err) {
    console.log(err)
  }
};

store.subscribe(() => saveState({
  boards: store.getState().data.boards,
  currentBoard: store.getState().data.currentBoard
}))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <DrawerTogglerContextProvider>
          <EditModalContextProvider>
            <App />
          </EditModalContextProvider>
        </DrawerTogglerContextProvider>
      </ThemeContextProvider>
    </Provider>
  </React.StrictMode>,
)
