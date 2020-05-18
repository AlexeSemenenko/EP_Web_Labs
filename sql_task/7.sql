select datediff(curdate(), date(created_at)) days 
from twitter.post
order by created_at
limit 1