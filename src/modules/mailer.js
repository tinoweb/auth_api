import nodemailer from 'nodemailer'
import path from 'path'
import PACKAGE_JSON from '../config/mail.json' assert {type: 'json'}
import hbs from 'nodemailer-express-handlebars'

const host = PACKAGE_JSON.host
const port = PACKAGE_JSON.port
const user = PACKAGE_JSON.user
const pass = PACKAGE_JSON.pass


const mailer = nodemailer.createTransport({
  host,
  port,
  auth: {user, pass }
});

const handleBarOption = {
  viewEngine: {
    extName: '.html',
    partialsDir: path.resolve('./src/resources/mail/'),
    defaultLayout: false
  },
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html',
}

const preConf = {
  viewEngine: 'handlebars',
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html',
  defaultLayout: 'template'
}

mailer.use('compile', hbs(handleBarOption))

export default mailer