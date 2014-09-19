class AddAvatarsToProfessors < ActiveRecord::Migration
  def self.up
    change_table :professors do |t|
      t.attachment :avatar
    end
  end

  def self.down
    drop_attached_file :professors, :avatar
  end
end
