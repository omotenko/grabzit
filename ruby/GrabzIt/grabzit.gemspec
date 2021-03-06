Gem::Specification.new do |s|
  s.name        = 'grabzit'
  s.version     = '2.2.1'
  s.date        = Date.today.to_s
  s.summary     = "GrabzIt Ruby Client"
  s.description = "Automatically create screenshots of website for free, with GrabzIt. Screenshots can be output in a variety of formats including: JPEG, PNG, TIFF, BMP, PDF, CSV and XLSX. Additionally GrabzIt allows you to convert online videos into animated GIF's."
  s.authors     = ["GrabzIt"]
  s.require_paths = ["lib"]
  s.email       = 'support@grabz.it'
  s.files       = ["Rakefile", "lib/grabzit.rb", "lib/grabzit/client.rb","lib/grabzit/cookie.rb","lib/grabzit/screenshotstatus.rb", "lib/grabzit/watermark.rb", "lib/grabzit/exception.rb", "test/test.png", "test/test_grabzit.rb"]
  s.homepage    = 'http://grabz.it/api/ruby'
  s.add_dependency('rake')
end