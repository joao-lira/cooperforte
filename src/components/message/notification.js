import Noty from 'noty'
import '../../../node_modules/noty/lib/noty.css'
import '../../../node_modules/noty/lib/themes/bootstrap-v4.css'

export function Notification(type, title, description) {
  new Noty({
    type: `${type}`,
    theme: 'bootstrap-v4',
    layout: 'topRight',
    text: `${title === undefined ? '' : `<b>${title}</b><br/>`}<small>${
      description === undefined ? '' : description
    }</small>`,
    timeout: 5000
  }).show()
}
