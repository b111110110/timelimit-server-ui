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

export class SignInForm {
  listener?: SignInFormListener = undefined
  readonly root: HTMLElement

  private readonly form: HTMLFormElement
  private readonly serverField: HTMLInputElement
  private readonly tokenField: HTMLInputElement
  private readonly submitButton: HTMLInputElement
  private enabled: boolean = true

  constructor () {
    this.form = document.createElement('form')
    this.serverField = document.createElement('input')
    this.tokenField = document.createElement('input')
    this.submitButton = document.createElement('input')

    this.serverField.placeholder = 'https://server.com'
    this.tokenField.placeholder = 'abcdefg'
    this.tokenField.type = 'password'

    this.submitButton.type = 'submit'
    this.submitButton.value = 'Connect'

    this.form.append(
      createHeader('Sign in'),
      this.serverField,
      this.tokenField,
      this.submitButton
    )

    this.form.addEventListener('submit', (e) => {
      e.preventDefault()

      if (this.enabled) {
        this.listener?.onSignInRequested({
          serverUrl: this.serverField.value,
          token: this.tokenField.value
        })
      }
    })

    this.root = this.form
  }

  reset () {
    this.serverField.value = ''
    this.tokenField.value = ''
    this.isEnabled = true
  }

  set isEnabled (enabled: boolean) {
    if (enabled === this.enabled) {
      return
    }

    this.enabled = enabled

    this.serverField.disabled = !enabled
    this.tokenField.disabled = !enabled
    this.submitButton.disabled = !enabled
  }

  get isEnabled () { return this.enabled }
}

interface SignInFormListener {
  onSignInRequested (params: { serverUrl: string, token: string }): void
}
