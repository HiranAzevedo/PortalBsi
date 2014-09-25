class ChangeFormatInTccsTable < ActiveRecord::Migration
  def change
    change_column :tccs, :data, :datetime
  end
end
