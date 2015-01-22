class AddTypeToOportunidades < ActiveRecord::Migration
  def change
	add_column :oportunidades, :type, :string
  end
end
