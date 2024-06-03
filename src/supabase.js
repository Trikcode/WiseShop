import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ntheugskytwmsuslpmrt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50aGV1Z3NreXR3bXN1c2xwbXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1ODk4ODAsImV4cCI6MjAyNDE2NTg4MH0.ewj-AtxG-wE7l8aNnlN754YVCuii5VUtHPcqSvxnJdM'
)

export default supabase
