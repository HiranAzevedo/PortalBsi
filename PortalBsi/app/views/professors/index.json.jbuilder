json.array!(@professors) do |professor|
  json.extract! professor, :nome, :email, :lattes
  json.url professor_url(professor, format: :json)
end