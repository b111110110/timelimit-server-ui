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

import { httpApiCreator } from './api/httpapi'
import { initAppController } from './controller/app'

const container = document.getElementById('app')

if (!container) {
  throw new Error()
}

initAppController({
  target: container,
  apiCreator: httpApiCreator
})
