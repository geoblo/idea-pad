import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MemoTemplate from './pages/MemoTemplate';
import MemoWrite from './pages/MemoWrite';
import MemoList from './pages/MemoList';
import MemoDetail from './pages/MemoDetail';

const theme = {
  memoBg: "#555555",
  button: "#ffd43b",
};

const GlobalStyle = createGlobalStyle`
  ${reset};

  body {
    color: white;
    background: #e9ecef;

    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
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
            <Route path="/idea-pad/" element={<MemoList />} />
            <Route path="/idea-pad/write" element={<MemoWrite />} />
            <Route path="/idea-pad/detail/:id" element={<MemoDetail />} />
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