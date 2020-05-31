import decode from 'jwt-decode';
import config from '../config';


export default class AuthService {
    constructor(domain) {
        this.domain = domain || config.api.BACKEND_ENDPOINT;
        this.login = this.login.bind(this);
        this.fetch = this.fetch.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
    }

    login(email, password) {
        // Get a token from api server using the fetch api
        return this.fetch('api/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            this.setToken(res['data']['token']);
            this.setUsername(res.data.username);
            return Promise.resolve(res);
        })
        .catch((res) => {
            return Promise.resolve(res);
        });
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken(); // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) && this.getUsername() !== undefined; // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            return decoded.exp < Date.now() / 1000;
        } catch (err) {
            return false;
        }
    }

    setToken(token) {
        localStorage.setItem('__user_token', token);
    }

    setUsername(username) {
        localStorage.setItem('__username', username);
    }

    getToken() {
        return localStorage.getItem('__user_token');
    }

    getUsername() {
        return localStorage.getItem('__username');
    }

    logout() {
        localStorage.removeItem('__user_token');
        localStorage.removeItem('__username');
    }

    fetch(url, options, skipDomain) {
        // performs api calls sending the required authentication headers
        const headers = {
            Accept: 'application/json',
            // 'Content-Type': 'application/json'
        };

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken();
        }
        let requestURL = this.domain + '/' + url;
        if (skipDomain) {
            requestURL = url;
        }
        return fetch(requestURL, {
            headers,
            ...options,
        })
            .then(this._checkStatus)
            .then((response) => response.json());
    }

    checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            // Success status lies between 200 to 300
            return response;
        }else if (response.status===400){ // @TODO JR: Be very very careful with this
            return response;
        } else {
            if (response.status === 401) {
                History.push('/login');
                this.logout();
            }
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
}
