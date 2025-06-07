import { customFetch } from './CustomFetcher';

class HttpService {
  host = process.env.HOST;
  basePath = `${this.host}${process.env.APIENDPOINT}`;

  buildUrl(endPoint, pathVariables) {
    let apiUrl = this.basePath;
    if (endPoint) {
      apiUrl = `${apiUrl}${endPoint}`;
    }
    if (pathVariables) {
      apiUrl = apiUrl + pathVariables;
    }
    return apiUrl;
  }
  async get(endPoint, { pathVariables, isRefreshed = true } = {}) {
    try {
      const url = this.buildUrl(endPoint, pathVariables);
      return customFetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        isRefreshed,
      })
        .then((res) => {
          if (res) {
            return res.json();
          }
        })
        .catch((err) => {
          console.error('Error fetching data:', err);
          console;
          throw new Error('Failed to fetch data');
        });
    } catch (err) {
      return new Error(err);
    }
  }
  async post(endPoint, { pathVariables, body, isRefreshed = true } = {}) {
    const url = this.buildUrl(endPoint, pathVariables);
    try {
      return customFetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        isRefreshed,
        body: JSON.stringify(body),
      }).then((res) => {
        if (res) {
          return res.json();
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  async put(endPoint, { pathVariables, body, isRefreshed = true } = {}) {
    const url = this.buildUrl(endPoint, pathVariables);
    return customFetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      isRefreshed,
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res) {
          return res.json();
        }
      })
      .catch((err) => {
        console.error('Error updating data:', err);
        throw new Error('Failed to update data');
      });
  }
  async delete(endPoint, { pathVariables, isRefreshed = true } = {}) {
    const url = this.buildUrl(endPoint, pathVariables);
    return customFetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      isRefreshed,
    });
  }
}

export const http = new HttpService();
