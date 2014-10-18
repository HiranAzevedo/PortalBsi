class AddCurrencyToOportunidades < ActiveRecord::Migration
  def change
  	add_column :oportunidades, :currency, :decimal, :precision => 8, :scale => 2
  end
end
