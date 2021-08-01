class HomeController < ApplicationController
  RELOAD_MAX = 3

  def index
    @@reload_count = 1
  end

  def status
    @reload_ids = ["1", "2"]
    @textContent = "#{@@reload_count}/#{RELOAD_MAX}, #{Time.now}"

    @@reload_count += 1
    @reload = (@@reload_count <= RELOAD_MAX)
  end
end
