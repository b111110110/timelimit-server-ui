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

import { createHeader } from './header'

export class StatusView {
  listener?: StatusViewListener
  readonly root: HTMLElement
  readonly text: HTMLSpanElement
  readonly refreshButton: HTMLButtonElement
  readonly resetButton: HTMLButtonElement
  private loading: boolean = false

  constructor () {
    this.root = document.createElement('div')
    this.text = document.createElement('span')
    this.refreshButton = document.createElement('button')
    this.resetButton = document.createElement('button')

    this.refreshButton.innerText = 'Refresh'
    this.resetButton.innerText = 'Reset'

    this.reset()

    this.refreshButton.addEventListener('click', () => this.listener?.onUpdateRequested())
    this.resetButton.addEventListener('click', () => this.listener?.onResetRequested())

    this.text.classList.add('statustext')

    this.root.append(
      createHeader('Status'),
      this.text,
      document.createElement('br'),
      this.resetButton,
      this.refreshButton
    )
  }

  reset () {
    this.status = ''
    this.isLoading = true
  }

  get isLoading () { return this.loading }
  set isLoading (value: boolean) {
    if (value === this.loading) {
      return
    }

    this.loading = value

    this.refreshButton.disabled = value
    this.resetButton.disabled = value
  }

  set status (text: string) {
    this.text.innerText = text
  }
}

interface StatusViewListener {
  onUpdateRequested (): void
  onResetRequested (): void
}
