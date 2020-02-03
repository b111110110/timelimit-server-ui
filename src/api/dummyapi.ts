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

const delay = (time: number) => new Promise((resolve, _) => {
  setTimeout(() => resolve(), time)
})

class DummyApiImpl implements Api {
  readonly wrongAuth: boolean

  constructor (wrongAuth: boolean) {
    this.wrongAuth = wrongAuth
  }

  async checkAuth () {
    if (this.wrongAuth) {
      await delay(100 + Math.random() * 400)

      throw new IllegalAccessDataError()
    }
  }

  async getStatus () {
    await this.checkAuth()

    await delay(100 + Math.random() * 400)

    return {
      websocketClients: Math.round(Math.random() * 20)
    }
  }

  async resetCounter () {
    await this.checkAuth()
  }

  async unlockPremium () {
    await this.checkAuth()
    await delay(100 + Math.random() * 400)
  }

  async getStatusMessage () {
    await this.checkAuth()
    await delay(100 + Math.random() * 400)

    return ''
  }

  async setStatusMessage () {
    await this.checkAuth()
    await delay(100 + Math.random() * 400)
  }
}

export const dummyApiCreator: ApiCreator = {
  createApi: () => new DummyApiImpl(Math.random() >= 0.2)
}
