import { registerReactControllerComponents } from '@symfony/ux-react';
import './bootstrap.js';
import React from 'react';
import ReactDOM from 'react-dom';
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
// import './styles/app.css';

// console.log('This log comes from assets/app.js - welcome to AssetMapper! 🎉');
function App() {
    return (
        <div>
            <h1>Hello from React in Symfony!</h1>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
registerReactControllerComponents(require.context('./react/controllers', true, /\.(j|t)sx?$/));
registerReactControllerComponents();