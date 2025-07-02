import axios from 'axios';

// Set up CSRF token for all requests
const token = document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

// Set default headers
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default axios;