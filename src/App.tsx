import NiceModal from '@ebay/nice-modal-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-loading-skeleton/dist/skeleton.css';
import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'shaka-player/dist/controls.css';
import 'react-toggle/style.css';
import './styles/index.css';
import './styles/tailwind.css';
import { createEmotionCache, MantineProvider } from '@mantine/core';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { LiveShowPage } from "./LiveShowPage";

global.EventSource = EventSourcePolyfill;
Modal.setAppElement('#root');

const queryClient = new QueryClient();
const emotionCache = createEmotionCache({key: 'mantine', prepend: false});

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        emotionCache={emotionCache}
        theme={{
          fontFamily: 'Inter, serif',
          colorScheme: 'dark',
          colors: {
            lemon: [
              '#F6F8EE',
              '#E6EECC',
              '#DBEAA8',
              '#D5EE7F',
              '#D5FB51',
              '#D5FB51',
              '#D5FB51',
              '#D5FB51',
              '#D5FB51',
              '#AFD03D',
            ],
            dark: [
              'white',
              '#A6A7AB',
              '#909296',
              '#5c5f66',
              '#373A40',
              '#2C2E33',
              '#25262b',
              '#1A1B1E',
              '#141517',
              '#101113',
            ],
          },
          components: {
            Text: {
              defaultProps: {
                color: 'white',
              },
            },
          },
        }}
      >
        <BrowserRouter>
          <NiceModal.Provider>
            <LiveShowPage/>
            <ToastContainer
              position="top-center"
              autoClose={5000}
            />
          </NiceModal.Provider>
        </BrowserRouter>
      </MantineProvider>
      {/*<ReactQueryDevtools initialIsOpen={false} />*/}
    </QueryClientProvider>
  );
};

export default App;
