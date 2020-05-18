select name
from (select name, count(*) posts_number
		from twitter.post
		inner join twitter.user on user.user_id = post.user_id
		where date(created_at) = curdate()
		group by name) posts_number
where posts_number > 3