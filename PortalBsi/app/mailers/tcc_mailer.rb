class TccMailer < ActionMailer::Base
  default from: "sistema@uniriotec.br"

  def create_email(tcc)
    @tcc = tcc
    mail({
             to: "bsi-alunos@uniriotec.br",
             bcc: ['hiran.tassinari@gmail.com'],
             subject: "Novo Tcc criado"
         })
  end
end
