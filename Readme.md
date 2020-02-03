# TimeLimit Server (Admin) UI

This is a graphical client for the [TimeLimit Server Admin API](https://codeberg.org/timelimit/timelimit-server#user-content-admin-api)
which runs in a webbrowser.

When built, it is a HTML, CSS and JS file which can be used directly
(by opening the HTML file) or by uploading it to a webserver.

After opening, one can enter the server url (path at which the TimeLimit server operates, not the path of the admin api)
and the admin token to connect. Then, one can do the following:

- view the status
- reset the counters from the status
- unlock the premium version for a user
- set a status message (which is shown at the client in the overview screen)

There is no direct concept of signing out. The acceess data is only saved in the memory
and refreshing the page or closing it is enough to "sign out".

## Building

This requires Node.JS and NPM.

- run ``npm install`` to get the dependencies
- run ``npm run build`` to build the application
- the application can be found in the ``dist`` directory

## Other commands

### npm run lint

- executes the linter
- the linter is executed during ``npm run build`` too

### npm run lint:fix

- executes the linter and fixes some issues automatically

### npm run develop

- launchs a webserver which serves the application
- changing the source code triggers rebuilding and refreshing in the browser

## License

> TimeLimit Server Admin UI
> Copyright (C) 2020 Jonas Lochmann
>
> This program is free software: you can redistribute it and/or modify
> it under the terms of the GNU General Public License as
> published by the Free Software Foundation, version 3 of the License.
>
> This program is distributed in the hope that it will be useful,
> but WITHOUT ANY WARRANTY; without even the implied warranty of
> MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
> GNU General Public License for more details.
>
> You should have received a copy of the GNU General Public License
> along with this program.  If not, see <https://www.gnu.org/licenses/>.
