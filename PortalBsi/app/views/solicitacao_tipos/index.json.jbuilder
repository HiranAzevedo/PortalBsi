json.array!(@solicitacao_tipos) do |solicitacao_tipo|
  json.extract! solicitacao_tipo, :tipo
  json.url solicitacao_tipo_url(solicitacao_tipo, format: :json)
end