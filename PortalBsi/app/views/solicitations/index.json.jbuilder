json.array!(@solicitations) do |solicitation|
  json.extract! solicitation, :solicitacao_tipos_id, :user_id, :observacao
  json.url solicitation_url(solicitation, format: :json)
end