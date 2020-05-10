select user_id, name
from (select user.user_id, name, count(*) posts_number
	from twitter.post
	inner join twitter.user
	on post.user_id = user.user_id
	group by name) numbers
where posts_number > 3