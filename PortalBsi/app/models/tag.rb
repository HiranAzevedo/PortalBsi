class Tag < ActiveRecord::Base
  validates :name, presence: true
  validates_presence_of :name
  validates_uniqueness_of :name, allow_nil: false
end