module ApplicationHelper
  def verificaTipo(tipo,nome_do_link)
    if tipo == nome_do_link
      return "ativo"
    end
  end
end
