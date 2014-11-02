class BsiMailer < ActionMailer::Base
  include Devise::Mailers::Helpers

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
  #def confirmation_instructions(record, token, opts={})
   # devise_mail(record, :confirmation_instructions, opts)
  #end

  #def reset_password_instructions(record, token, opts={})
   # devise_mail(record, :reset_password_instructions, opts)
  #end

  #def unlock_instructions(record, token, opts={})
   # devise_mail(record, :unlock_instructions, opts)
  #end
end