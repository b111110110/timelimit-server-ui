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

export class LogView {
  readonly short = 1000 * 5
  readonly long = 1000 * 30
  readonly forever = 0

  readonly root: HTMLElement

  constructor () {
    this.root = document.createElement('div')

    this.root.classList.add('logcontainer')
  }

  addMessage (message: string, duration: number) {
    const view = document.createElement('span')

    view.innerText = message

    this.root.appendChild(view)

    if (duration) {
      setTimeout(() => {
        this.root.removeChild(view)
      }, duration)
    }
  }
}
