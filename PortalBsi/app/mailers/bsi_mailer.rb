class BsiMailer < ActionMailer::Base

  default from: "sistema@uniriotec.br"

  def create_email(tcc)
    @tcc = tcc
    mail({
             to: "thiagobleao@gmail.com",
             bcc: ['hiran.tassinari@gmail.com'],
             subject: "Novo Tcc criado"
         })
    mail.deliver
  end

  def publish_email(tcc)
    @tcc = tcc
    mail({
             to: "thiagobleao@gmail.com",
             bcc: ['hiran.tassinari@gmail.com'],
             subject: 'Tcc publicado'
         })
    mail.deliver
  end

  def oportunidade_email(oportunidade, email)
    @oportunidade = oportunidade
    @email = email
    mail({
              to: @email,
              subject: 'Uma nova Oportunidade foi publicada'
      })
    mail.deliver
  end

end