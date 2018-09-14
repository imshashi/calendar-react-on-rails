class Appointment < ApplicationRecord
  validates_presence_of :title, :apt_time
end
