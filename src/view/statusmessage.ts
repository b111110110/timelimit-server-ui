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

export class StatusMessageForm {
  listener?: StatusMessageFormListener = undefined

  readonly root = document.createElement('div')
  private readonly field = document.createElement('textarea')
  private readonly confirmBtn = document.createElement('button')
  private readonly errorView = document.createElement('span')
  private statusInternal: 'loading' | 'saving' | 'editable' | 'error'

  constructor () {
    this.field.rows = 10

    this.status = 'loading'

    this.confirmBtn.addEventListener('click', () => {
      if (this.status === 'editable') {
        this.listener?.onEditRequested(this.text)
      }
    })

    this.hideSaveButton()

    this.field.addEventListener('keyup', () => {
      this.confirmBtn.style.display = 'block'
    })

    this.root.append(
      createHeader('Status message'),
      this.field,
      this.confirmBtn,
      this.errorView
    )
  }

  get status () { return this.statusInternal }
  set status (value) {
    this.statusInternal = value

    const canEdit = value === 'editable'

    this.field.disabled = !canEdit
    this.confirmBtn.disabled = !canEdit

    this.confirmBtn.innerText = value === 'saving' ? 'Saving ...' : 'Save'
    this.errorView.innerText = value === 'error' ? 'a error occured' : ''
  }

  get text () { return this.field.value }
  set text (value: string) { this.field.value = value }

  hideSaveButton () {
    this.confirmBtn.style.display = 'none'
  }
}

export interface StatusMessageFormListener {
  onEditRequested (newMessage: string): void
}
