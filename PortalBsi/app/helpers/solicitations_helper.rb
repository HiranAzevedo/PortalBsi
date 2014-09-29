module SolicitationsHelper
  def RetornaTipoSolicitacao(id)
    solicitacaoTipo = SolicitacaoTipo.find_by(id)
    return solicitacaoTipo.tipo
  end

  def RetornaUserName(id)
    usuario = User.find_by(id)
    return usuario.nome
  end
end
