import nodemailer from 'nodemailer';
import exphbs from 'express-handlebars';
import config from '../config/mail';
import htmlLib from 'html-to-text';
import { resolve, dirname } from 'path';
const { from, ...mailConfig } = config;

class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({ ...mailConfig });
    this.viewPath = resolve(resolve(dirname('')), 'src', 'resources', 'views', 'emails');
    this.hsb = exphbs.create({
      layoutsDir: resolve(this.viewPath, 'layouts'),
      // partialsDir: resolve(this.viewPath, 'partials'),
      defaultLayout: 'default',
      extname: '.hbs'
    });
  }

  static getInstance() {
    if (!Mailer.instance) {
      Mailer.instance = new Mailer();
    }
    return Mailer.instance;
  }

  async sendEmail(template, message) {
    const { context, ...msg } = message;
    const { htmlToText } = htmlLib;
    try {
      //* Getting the template requested
      const bodyHtml = await this.hsb.render(resolve(this.viewPath, `${template}.handlebars`), context);

      //* Getting the entire HTML with the template inside it
      const html = await this.hsb.render(resolve(this.viewPath, 'layouts', 'default.hbs'), { body: bodyHtml });

      const text = htmlToText(html);
      return this.transporter.sendMail(
        {
          from: from,
          ...msg,
          text,
          html
        },
        (error) => {
          if (error) {
            throw { message: 'Ocorreu um erro no envio do email.', error: error };
          }
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

export default Mailer.getInstance();
