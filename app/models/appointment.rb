class Appointment < ApplicationRecord
  validates_presence_of :title, :apt_time

  validates :title, length: { minimum: 3 }

  validate :check_apt_time_validity

  private
    def check_apt_time_validity
      if apt_time.present? && apt_time < Time.now
        errors.add(:apt_time, "can't be in the past")
      end
    end
end
