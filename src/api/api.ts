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

export interface Api {
  getStatus (): Promise<object>
  resetCounter (): Promise<void>
  unlockPremium (params: {
    mail: string
    duration: 'month' | 'year'
  }): Promise<void>
  getStatusMessage (): Promise<string>
  setStatusMessage (newMessage: string): Promise<void>
}

export interface ApiCreator {
  createApi (params: { serverUrl: string, token: string }): Api
}

export class IllegalAccessDataError {}
