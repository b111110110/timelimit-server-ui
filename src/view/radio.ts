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

import { generateId } from './id'

export class RadioButton {
  readonly root: HTMLLabelElement
  private readonly radio: HTMLInputElement
  private readonly labelView: HTMLSpanElement
  private enabled = true

  constructor ({ name, value, label }: {
    name: string
    value: string
    label: string
  }) {
    const id = generateId()

    this.root = document.createElement('label')
    this.radio = document.createElement('input')
    this.labelView = document.createElement('span')

    this.root.classList.add('radiocontainer')

    this.radio.type = 'radio'
    this.radio.name = name
    this.radio.value = value

    this.labelView.innerText = label

    this.radio.id = id
    this.root.htmlFor = id

    const radioicon = document.createElement('span')
    radioicon.classList.add('radioicon')

    this.root.append(this.radio, radioicon, this.labelView)
  }

  get isChecked () { return this.radio.checked }
  set isChecked (value: boolean) { this.radio.checked = value }

  get isEnabled () { return this.enabled }
  set isEnabled (value: boolean) {
    if (this.enabled === value) {
      return
    }

    this.enabled = value
    this.radio.disabled = !value
  }
}
