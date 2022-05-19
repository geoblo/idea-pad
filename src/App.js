import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MemoTemplate from './components/MemoTemplate';
import MemoWrite from './components/MemoWrite';
import MemoList from './components/MemoList';
import MemoDetail from './components/MemoDetail';

const theme = {
  memoBg: "#555555",
  button: "#ffd43b",
};

const GlobalStyle = createGlobalStyle`
  ${reset};

  body {
    color: white;
    background: #e9ecef;
  }

  a {
    text-decoration: none;
    color: white;
  }

  .custom-scroll {
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #cccccc;
      border-radius: 2.5px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: #aaaaaa;
    }
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<MemoTemplate />}>
            <Route path="/" element={<MemoList />} />
            <Route path="/write" element={<MemoWrite />} />
            <Route path="/detail/:id" element={<MemoDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        theme="dark"
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  );
}

export default App;