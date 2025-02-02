import React from 'react';
import App from './App.tsx';
import './styles/global.scss';
import {createRoot} from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home"/>);

