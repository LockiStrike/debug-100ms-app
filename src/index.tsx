import * as Sentry from '@sentry/react';
import { StrictMode, Suspense } from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import './services/translation/i18n';

(async () => {
  try {
    const container = document.getElementById('root');
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <Suspense fallback={'Loading...'}>
          <App/>
        </Suspense>
      </StrictMode>
    );
  } catch (err) {
    Sentry.captureException(err);
  }
})();
