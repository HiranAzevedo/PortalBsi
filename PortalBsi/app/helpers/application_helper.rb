module ApplicationHelper
  def verificaMenuAtivo(tipo,nome_do_link)
    if tipo == nome_do_link
      return "ativo"
    end
  end

  def error_tag(model, attribute)
  	if model.errors.has_key? attribute
  	  content_tag(:div,model.errors[attribute].first, class: 'error_message')
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
end
