module ApplicationHelper
  def verificaMenuAtivo(tipo,nome_do_link)
    if tipo == nome_do_link
      return "ativo"
    end
  end
  def verificaiconeAtivo(secao,nome_secao)
    if nome_secao == secao
      return "iconeAtivo"
    else
      return "icone"
    end
  end
  def verificaTccExiste(user_id)
    if Tcc.find_by_user_id(user_id).nil?
      return false
    else
      return true
    end
  end

  def retornaApelido(nome)
    if nome.nil?
      return nil
    else
      return nome.split[0]
    end
  end
  def RetornaTccidByUserid(userid)
    tcc_menu = Tcc.find_by_user_id(userid)
    if tcc_menu.nil?
      return nil
    else
      return tcc_menu.id
    end
  end

  def url_with_protocol(url)
    /^http/i.match(url) ? url : "http://#{url}"
  end

  def flash_class(level)
    case level
      when :notice then "alert alert-success"
      when :success then "alert alert-success"
      when :error then "alert alert-danger"
      when :alert then "alert alert-danger"
    end
  end
end
