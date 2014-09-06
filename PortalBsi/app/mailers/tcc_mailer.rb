class TccMailer < ActionMailer::Base
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
end
