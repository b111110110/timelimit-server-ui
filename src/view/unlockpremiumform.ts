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
import { RadioButton } from './radio'

export class UnlockPremiumForm {
  listener?: UnlockPremiumFormListener = undefined
  readonly root: HTMLElement
  private readonly form: HTMLFormElement
  private readonly mailField: HTMLInputElement
  private readonly durationMonthField: RadioButton
  private readonly durationYearField: RadioButton
  private readonly submitButton: HTMLInputElement
  private enabled: boolean = true

  constructor () {
    this.form = document.createElement('form')
    this.mailField = document.createElement('input')
    this.durationMonthField = new RadioButton({ name: 'duration', value: 'month', label: 'Month' })
    this.durationYearField = new RadioButton({ name: 'duration', value: 'year', label: 'Year' })
    this.submitButton = document.createElement('input')

    this.mailField.placeholder = 'user@provider.com'

    this.submitButton.type = 'submit'
    this.submitButton.value = 'Unlock'

    this.reset()

    this.form.addEventListener('submit', (e) => {
      e.preventDefault()

      const mail = this.mailField.value
      let duration: 'month' | 'year'

      if (this.durationMonthField.isChecked) {
        duration = 'month'
      } else if (this.durationYearField.isChecked) {
        duration = 'year'
      } else {
        throw new Error()
      }

      this.listener?.onUnlockPremiumRequested({ mail, duration })
    })

    this.form.append(
      createHeader('Unlock premium version'),
      this.mailField,
      this.durationMonthField.root,
      this.durationYearField.root,
      this.submitButton
    )

    this.root = this.form
  }

  reset () {
    this.durationMonthField.isChecked = true
    this.durationYearField.isChecked = false
    this.mailField.value = ''
    this.isEnabled = true
  }

  set isEnabled (value: boolean) {
    if (value === this.enabled) {
      return
    }

    this.enabled = value

    this.mailField.disabled = !value
    this.durationMonthField.isEnabled = value
    this.durationYearField.isEnabled = value
    this.submitButton.disabled = !value
  }
}

interface UnlockPremiumFormListener {
  onUnlockPremiumRequested (params: {
    mail: string
    duration: 'month' | 'year'
  }): void
}
