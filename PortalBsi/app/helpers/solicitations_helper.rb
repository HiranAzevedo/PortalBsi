module SolicitationsHelper
  def RetornaTipoSolicitacao(id)
    solicitacaoTipo = SolicitacaoTipo.find(id)
    return solicitacaoTipo.tipo
  end

  def RetornaUserName(id)
    usuario = User.find(id)
    return usuario.nome
  end
end
