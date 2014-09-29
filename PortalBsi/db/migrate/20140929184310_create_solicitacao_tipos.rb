class CreateSolicitacaoTipos < ActiveRecord::Migration
  def change
    create_table :solicitacao_tipos do |t|
      t.string :tipo

      t.timestamps
    end
  end
end
