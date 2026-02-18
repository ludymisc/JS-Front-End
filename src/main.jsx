/**
 * Entry point for the React application.
 *
 * This file mounts the React component tree into the DOM. It configures
 * the top-level application wrappers: `StrictMode` for runtime checks,
 * `BrowserRouter` for client-side routing, and `CartProvider` for
 * application-wide cart state. Each subsequent import is intentionally
 * documented so maintainers can quickly understand why it's present.
 */

// Import React's StrictMode helper to enable additional checks and warnings
import { StrictMode } from 'react'

// Import the React 18+ root creator used to mount the app into the DOM
import { createRoot } from 'react-dom/client'

// Import the router component that enables HTML5 history-based routing
import { BrowserRouter } from 'react-router-dom'

// Import global styles so the app has the expected baseline CSS
import './index.css'

// Import the root application component (the main app UI tree)
import App from './app.jsx'

// Import a context provider that exposes cart state and actions app-wide
import { CartProvider } from './components/cartContext.jsx'

// Find the DOM element with id 'root' and mount the React application there.
// `createRoot(...).render(...)` is the recommended mounting API in React 18+.
createRoot(document.getElementById('root')).render(
  // Wrap the tree in StrictMode to surface potential problems in development
  <StrictMode>
    {/* BrowserRouter enables declarative routing for the app */}
    <BrowserRouter>
      {/* CartProvider makes cart state available via React Context */}
      <CartProvider>
        {/* App is the top-level component rendering the entire UI */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
