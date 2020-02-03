/*
 * TimeLimit Server Admin UI
 * Copyright (C) 2020 Jonas Lochmann
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Api, ApiCreator, IllegalAccessDataError } from './api'

class HttpApiImpl implements Api {
  readonly serverUrl: string
  readonly token: string

  constructor ({ serverUrl, token }: {
    serverUrl: string
    token: string
  }) {
    this.serverUrl = serverUrl + '/admin'
    this.token = token
  }

  async checkAuth () {
    await this.getStatus()
  }

  async getStatus () {
    const response = await fetch(this.serverUrl + '/status', {
      mode: 'cors',
      cache: 'no-cache',
      referrerPolicy: 'no-referrer',
      headers: {
        Authorization: 'Basic ' + btoa(':' + this.token)
      }
    })

    if (response.status === 401) {
      throw new IllegalAccessDataError()
    }

    if (!response.ok) {
      throw new Error('unexpected response - ' + response.status)
    }

    const result = await response.json()

    if (typeof result !== 'object') {
      throw new Error('bad response')
    }

    return result
  }

  async resetCounter () {
    const response = await fetch(this.serverUrl + '/reset-counters', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      referrerPolicy: 'no-referrer',
      headers: {
        Authorization: 'Basic ' + btoa(':' + this.token),
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 401) {
      throw new IllegalAccessDataError()
    }

    if (!response.ok) {
      throw new Error('unexpected response - ' + response.status)
    }

    await response.json()
  }

  async unlockPremium (params: {
    mail: string
    duration: 'month' | 'year'
  }) {
    const response = await fetch(this.serverUrl + '/unlock-premium', {
      method: 'POST',
      body: JSON.stringify(params),
      mode: 'cors',
      cache: 'no-cache',
      referrerPolicy: 'no-referrer',
      headers: {
        Authorization: 'Basic ' + btoa(':' + this.token),
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 401) {
      throw new IllegalAccessDataError()
    }

    if (!response.ok) {
      throw new Error('unexpected response - ' + response.status)
    }

    await response.json()
  }

  async getStatusMessage (): Promise<string> {
    const response = await fetch(this.serverUrl + '/status-message', {
      mode: 'cors',
      cache: 'no-cache',
      referrerPolicy: 'no-referrer',
      headers: {
        Authorization: 'Basic ' + btoa(':' + this.token),
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 401) {
      throw new IllegalAccessDataError()
    }

    if (!response.ok) {
      throw new Error('unexpected response - ' + response.status)
    }

    const result = await response.json()

    if (typeof result !== 'object' || typeof result.statusMessage !== 'string') {
      throw new Error('bad response')
    }

    return result.statusMessage
  }

  async setStatusMessage (message: string): Promise<void> {
    const response = await fetch(this.serverUrl + '/status-message', {
      method: 'POST',
      body: JSON.stringify({ message }),
      mode: 'cors',
      cache: 'no-cache',
      referrerPolicy: 'no-referrer',
      headers: {
        Authorization: 'Basic ' + btoa(':' + this.token),
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 401) {
      throw new IllegalAccessDataError()
    }

    if (!response.ok) {
      throw new Error('unexpected response - ' + response.status)
    }

    await response.json()
  }
}

export const httpApiCreator: ApiCreator = {
  createApi: (url) => new HttpApiImpl(url)
}
