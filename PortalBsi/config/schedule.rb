#Local onde o log vai ser salvo em caso de erro
#mudar no dia do deploy
set :output, "/home/guilherme/Projetos_Ruby/PortalBsi/PortalBsi/log/PortalBsi.log" 
# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:
#
# set :output, "/path/to/my/cron_log.log"
#
# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Learn more: http://github.com/javan/whenever
every 1.minute do
  runner "Oportunidade.newsletter_email" 
end	


