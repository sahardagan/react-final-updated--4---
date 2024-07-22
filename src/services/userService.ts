
import axios from 'axios';

const apiEndpoint = 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/me';

export function getCurrentUser() {
    return axios.get(apiEndpoint, {
        headers: {
            'x-auth-token': localStorage.getItem('token') // Assuming you store the token in localStorage
        }
    });
}
