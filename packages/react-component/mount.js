import { createRoot } from 'react-dom/client';

import { Fragment } from "react";

import {
    BrowserRouter,
    Route,
    Routes,
    Link
  } from "react-router-dom";

import Component from './index.js'

const Default = () => {
    return (<Fragment>
        <h1>Index</h1>
        <div><Link to={ `/${SUBJECT}/` }>{SUBJECT}</Link></div>
    </Fragment>)
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/home" element={<Default />} />
            <Route path={`/${SUBJECT}/*`} element={<Component />} />
        </Routes>
    </BrowserRouter>
);