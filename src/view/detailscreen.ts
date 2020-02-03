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

import { wrapInBorder } from './border'
import { LogView } from './logview'
import { StatusView } from './status'
import { StatusMessageForm } from './statusmessage'
import { UnlockPremiumForm } from './unlockpremiumform'

export class DetailScreen {
  status = new StatusView()
  unlockPremium = new UnlockPremiumForm()
  unlockPremiumLog = new LogView()
  statusMessage = new StatusMessageForm()
  statusMessageLog = new LogView()
  root = document.createElement('div')

  constructor () {
    this.root.append(
      wrapInBorder(this.status.root),
      wrapInBorder(
        this.unlockPremium.root,
        this.unlockPremiumLog.root
      ),
      wrapInBorder(
        this.statusMessage.root,
        this.statusMessageLog.root
      )
    )
  }
}
