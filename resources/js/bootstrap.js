import axios from 'axios';
import { setDefaultOptions } from 'date-fns'
import { es } from 'date-fns/locale'

setDefaultOptions({ locale: es })

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.get('/sanctum/csrf-cookie').then(response => {
    // Login...
});
