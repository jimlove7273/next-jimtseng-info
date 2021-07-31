const sgMail = require('@sendgrid/mail')

export default async function(req, res) {
  sgMail.setApiKey('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')

  const { msgdata, outmessage } = req.body

  const content = {
    to: 'jimlove@myehouse.com',
    from: 'jimlove@myehouse.com',
    subject: msgdata.subject + " - " + msgdata.name + "(" + msgdata.email + ")",
    text: outmessage,
    html: `<p>${outmessage}</p>`
  }

  try {
    await sgMail.send(content)
		res.status(200).send('Message sent successfully.')
  } catch (error) {
    console.log('ERROR', error)
		res.status(400).send('Message not sent: ' + error)
  }
}