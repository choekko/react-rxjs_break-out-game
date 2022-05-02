import React from 'react';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import theme from 'styles/theme';
import GlobalStyle from 'styles/global';
import Main from 'pages/Main';
import { Subscribe } from '@react-rxjs/core';

function App() {
  return (
    <Subscribe>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Main />
      </ThemeProvider>
    </Subscribe>
  );
}

export default App;
