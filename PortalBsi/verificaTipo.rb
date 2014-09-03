def verificaTipo(tipo,nome_do_link)
  if tipo == nome_do_link
    return "ativo tcc"
  end
end

teste = verificaTipo("home","erro")

puts teste
