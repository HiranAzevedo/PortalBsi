class AddArquivoApresentadoToTcc < ActiveRecord::Migration
  def change
    add_column :tccs, :nome_arquivo, :string
    add_column :tccs, :apresentado, :boolean
  end
end
