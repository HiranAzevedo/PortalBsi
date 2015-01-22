class AddPictureToOportunidades < ActiveRecord::Migration
  def change
    add_column :oportunidades, :picture, :string
  end
end