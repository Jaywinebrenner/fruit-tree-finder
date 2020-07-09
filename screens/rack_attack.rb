class Rack::Attack

  Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new

  throttle("requests per ip", limit: 100, period: 5.minutes) do |req|
    req.ip if req.path == "/"
  end

  throttle("limit logins per email", limit: 10, period: 5.minutes) do |req|
    if req.path == "/signin" && req.post?
      if (req.params["email"].to_s.size > 0)
        req.params["email"].presence
      end
    end
  end

  throttle("limit signups", limit: 1, period: 1.minute) do |req|
    req.ip if req.path == "/users" && req.post?
  end
end
