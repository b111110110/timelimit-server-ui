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

import { Api, ApiCreator, IllegalAccessDataError } from '../api/api'
import { DetailScreen } from '../view/detailscreen'
import { SignInScreen } from '../view/signinscreen'

export const initAppController = ({ target, apiCreator }: {
  target: HTMLElement
  apiCreator: ApiCreator
}) => {
  function clean () {
    while (target.firstChild) {
      target.removeChild(target.firstChild)
    }
  }

  function showLoginScreen () {
    const view = new SignInScreen()

    clean(); target.append(view.root)

    view.form.listener = {
      async onSignInRequested ({ serverUrl, token }) {
        view.form.isEnabled = false

        try {
          const api = apiCreator.createApi({ serverUrl, token })

          await api.getStatus()

          showDetailScreen(api)
        } catch (ex) {
          console.warn(ex)

          if (ex instanceof IllegalAccessDataError) {
            view.log.addMessage('access data invalid', view.log.short)
          } else {
            view.log.addMessage('could not connect', view.log.short)
          }
        } finally {
          view.form.isEnabled = true
        }
      }
    }
  }

  function showAccessDataWrong () {
    alert('access data invalid')
    showLoginScreen()
  }

  function showDetailScreen (api: Api) {
    const view = new DetailScreen()

    clean(); target.append(view.root)

    async function refreshDetail (reset?: boolean) {
      view.status.isLoading = true

      try {
        if (reset) {
          await api.resetCounter()
        }

        const status = await api.getStatus()

        view.status.status = JSON.stringify(status, null, 2)
      } catch (ex) {
        if (ex instanceof IllegalAccessDataError) {
          showAccessDataWrong()
        } else {
          view.status.status = 'could not load status'
        }
      } finally {
        view.status.isLoading = false
      }
    }

    view.status.status = 'no data yet'

    // this catches exceptions by itself
    // tslint:disable-next-line:no-floating-promises
    refreshDetail()

    view.status.listener = {
      onUpdateRequested: () => refreshDetail(),
      onResetRequested: () => refreshDetail(true)
    }

    view.unlockPremium.listener = {
      onUnlockPremiumRequested: async ({ mail, duration }) => {
        view.unlockPremium.isEnabled = false

        try {
          await api.unlockPremium({ mail, duration })

          view.unlockPremium.reset()

          view.unlockPremiumLog.addMessage('unlocked premium version for ' + duration + ' for ' + mail, view.unlockPremiumLog.long)
        } catch (ex) {
          if (ex instanceof IllegalAccessDataError) {
            showAccessDataWrong()
          } else {
            view.unlockPremiumLog.addMessage('could not unlock', view.unlockPremiumLog.short)
          }
        } finally {
          view.unlockPremium.isEnabled = true
        }
      }
    }

    // this catches exceptions by itself
    // tslint:disable-next-line:no-floating-promises
    ;(async () => {
      try {
        view.statusMessage.status = 'loading'

        const statusMessage = await api.getStatusMessage()

        view.statusMessage.status = 'editable'
        view.statusMessage.text = statusMessage
      } catch (ex) {
        if (ex instanceof IllegalAccessDataError) {
          showAccessDataWrong()
        } else {
          view.statusMessage.status = 'error'
          view.statusMessageLog.addMessage('could not get status message', view.unlockPremiumLog.short)
        }
      }
    })()

    view.statusMessage.listener = {
      onEditRequested: async (newMessage: string) => {
        view.statusMessage.status = 'saving'

        try {
          await api.setStatusMessage(newMessage)

          view.statusMessage.hideSaveButton()
          view.statusMessageLog.addMessage('status message saved', view.unlockPremiumLog.short)
        } catch (ex) {
          if (ex instanceof IllegalAccessDataError) {
            showAccessDataWrong()
          } else {
            view.statusMessageLog.addMessage('could not set status message', view.unlockPremiumLog.short)
          }
        } finally {
          view.statusMessage.status = 'editable'
        }
      }
    }
  }

  showLoginScreen()
}
